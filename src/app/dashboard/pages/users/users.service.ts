import { Injectable } from '@angular/core';
import { User } from './models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RouterTestingHarness } from '@angular/router/testing';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor() { 
    this.usersSubject.next([
      {
        id: 1,
        name: "Tony",
        lastName: "Stark",
        email: "ironman@mail.com",
  
      },
      {
        id: 2,
        name: "Bruce",
        lastName: "Banner",
        email: "hulk@mail.com",
      },
      {
        id: 3,
        name: "Natasha",
        lastName: "Romanoff",
        email: "black.widow@mail.com",
      }
    ]);
   }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  
  }

  addUser(user: User): void {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, { ...user}]);
  }

  updateUser(updatedUser: User): void {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = currentUsers.map((user) => 
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );
      this.usersSubject.next(updatedUsers);
  }

  deleteUser(userId: number): void {
    const currentUsers = this.usersSubject.value;
    const filteredUsers = currentUsers.filter((user) => user.id !== userId);
    this.usersSubject.next(filteredUsers);
  }

}
