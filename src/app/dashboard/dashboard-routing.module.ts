import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailComponent } from './pages/users/components/user-detail/user-detail.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: 'home',
            component: HomeComponent,
          },
          {
            path: 'courses',
            loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule)
          },
          {
            path: 'users', 
            loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
          },
          {
            path: '**',
            redirectTo: 'home',
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
