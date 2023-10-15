import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  userName = '';

  users: User[] = [];

  constructor(
    private matDialog: MatDialog,
    ) {

    }
  
  openUsersDialog(): void {
    this.matDialog.open(UsersDialogComponent)
    .afterClosed()
    .subscribe({
      next: (v) => {
        console.log('VALOR: ', v);
        if(!! v ){
          this.users = [
            ...this.users,
            {
              ...v,
              id: new Date().getTime(),
            },
          ]
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
          this.users = this.users.map((u) =>
            u.id === user.id ? { ...u, ...v } : u
          );
        }
      },
    });
  }

  onDeleteUser(userId: number): void {
    if(confirm('¿Está usted seguro?')){
      this.users = this.users.filter((u) => u.id !==userId);
    }
    
  }
  
}
