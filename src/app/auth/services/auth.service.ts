import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, map } from 'rxjs';
import { User } from 'src/app/dashboard/pages/users/models';
import { LoginPayload } from '../models';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.local';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);

  public authUser$ = this._authUser$.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(payload: LoginPayload): void {
    this.httpClient
    .get<User[]>(`${environment.baseUrl}/users?email=${payload.email}&password=${payload.password}`)
    .subscribe({
       next: (response) => {
        if (!response.length) {
          alert('Usuario o contraseña inválidos');
        } else {
          const authUser = response[0];
          this._authUser$.next(authUser);
          localStorage.setItem('token', authUser.token);
          this.router.navigate(['/dashboard/home'])
        }
       },
       error: (err) => {
        console.log(err);
        alert ('Error de conexión');
       },
    });
  }

    verifyToken(): Observable<boolean> {
      return this.httpClient
      .get<User[]>(
        `${environment.baseUrl}/users?token=${
          localStorage.getItem('token')}`
      )
      .pipe(
        map((users) => {
          if (!users.length) {
            return false;
          } else {
            const authUser = users[0];
            this._authUser$.next(authUser);
            localStorage.setItem('token', authUser.token);
            return true;
          }
        })
      );
    }

    logout(): void {
      this._authUser$.next(null);
      localStorage.removeItem('token');
      console.log('token');
      this.router.navigate(['/auth/login']);
    }
}
 