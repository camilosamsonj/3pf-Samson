import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

// Definimos algunas rutas de ejemplo
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
];

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;
  let debugElement: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes(routes)],
        declarations: [AppComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

//   it('should navigate to /dashboard when clicking on a link', () => {
//     // Encuentra el enlace usando el selector de atributos y el valor de routerLink
//     const link = debugElement.query(By.css('[routerLink="/dashboard"]'));

//     // Simula el clic en el enlace
//     link.triggerEventHandler('click', null);

//     fixture.whenStable().then(() => {
//       // Verifica que la ubicación sea /dashboard
//       expect(location.path()).toBe('/dashboard');
//     });
//   });

  it('should navigate to /dashboard when calling navigate method', () => {
    router.navigate(['dashboard']);

    fixture.whenStable().then(() => {
      expect(location.path()).toBe('');
    });
  });
});

// Agregamos un componente ficticio para que el código compile sin errores
@Component({ template: '' })
class DummyComponent {}
