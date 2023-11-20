import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: string | undefined;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Utiliza paramMap para obtener el id de la ruta
    const idFromRoute = this.activatedRoute.snapshot.paramMap.get('id');

    // Verifica si idFromRoute no es null ni undefined antes de asignarlo a userId
    if (idFromRoute !== null && idFromRoute !== undefined) {
      this.userId = idFromRoute;

      // Tu lógica aquí, por ejemplo, cargar detalles del usuario con this.userId
      console.log(this.userId);
    } else {
      console.error('No se proporcionó un ID en la ruta.');
    }
  }
}
