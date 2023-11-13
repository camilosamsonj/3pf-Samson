import { Injectable } from '@angular/core';
import { User } from './models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        email: "ironman@shield.com",
        token: "",
        role: ""
      },
      {
        id: 2,
        name: "Bruce",
        lastName: "Banner",
        email: "hulk@shield.com",
        token: "",
        role: ""
      },
      {
        id: 3,
        name: "Natasha",
        lastName: "Romanoff",
        email: "black.widow@shield.com",
        token: "",
        role: ""
      },
      {
        id: 4,
        name: "Steve",
        lastName: "Rogers",
        email: "captainamerica@shield.com",
        token: "",
        role: ""
      },
      {
        id: 5,
        name: "Nick",
        lastName: "Fury",
        email: "nickfury@shield.com",
        token: "",
        role: ""
      },
      {
        id: 6,
        name: "Wanda",
        lastName: "Maximoff",
        email: "scarletwitch@shield.com",
        token: "",
        role: ""
      },
    ]);
   }

  transformUser(user: User): User {
    const fullName = `${user.name} ${user.lastName}`;  
    return { ...user, fullName };
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable().pipe(
      map(users => users.map(user => this.transformUser(user)))
    );
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
