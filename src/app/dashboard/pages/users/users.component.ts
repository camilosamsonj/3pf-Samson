import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';
import { UsersService } from './users.service';
import { Observable, Subject} from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  // userName = '';
  users$: Observable<User[]> = new Observable<User[]>();

  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService,
    ) {}

  ngOnInit(): void {
    this.users$ = this.usersService.users$
    .pipe(takeUntil(this.destroy$),
    map((users: User[]) => users.map(user => this.usersService.transformUser(user)))
    );
  } 

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();

  }

  
  openUsersDialog(): void {
    this.matDialog.open(UsersDialogComponent)
    .afterClosed()
    .subscribe({
      next: (v) => {
        if(!! v ){
          this.usersService.addUser({ ...v, id: new Date().getTime()});
        }
      }
    });
  }


  onEditUser(user: User): void {
    console.log('Método onEditUser llamado con el usuario: ', user);
    

    this.matDialog.open(UsersDialogComponent, {
      data: user,
    })
    .afterClosed()
    .subscribe({
      next: (v) => {
        if (!!v) {
          this.usersService.updateUser({ ...user, ...v });
        }
      },
    });
  }

  onDeleteUser(userId: number): void {
    if(confirm('¿Está usted seguro?')){
      this.usersService.deleteUser(userId);
    }
    
  }



}
