import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CoursesComponent,
      },
      {
        path: ':id',
        component: CourseDetailComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
  
})
export class CoursesRoutingModule {}
