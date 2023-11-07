import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';import { SharedModule } from '../shared/shared.module';
import { UsersModule } from './pages/users/users.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CoursesModule } from './pages/courses/courses.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    SharedModule, 
    UsersModule,
    MatListModule,
    RouterModule,
    CoursesModule,

  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule {}
