import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/dashboard/pages/courses/models/';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog
    ) {
   this.courses$ =  this.coursesService.getCourses$();
  }

  selectedDate: Date[] = [];
  
  addDate(fecha: Date): void {
      this.selectedDate.push(fecha);
  }



  addCourse(): void {
    this.matDialog.open(CoursesDialogComponent).afterClosed().subscribe({
      next: (result) => {
        if (result) {

          const startDate = this.selectedDate.length > 0 ? this.selectedDate[0]:null;
          const endDate = this.selectedDate.length > 1 ? this.selectedDate[1]:null;


          this.coursesService.createCourse$({
            id: new Date().getTime(),
            name: result.name,
            startDate: startDate,
            endDate: endDate

          });
        }
      }
    });
  }


  editCourse(course: Course): void {

    this.matDialog.open(CoursesDialogComponent, {
      data: course,
    })
    .afterClosed()
    .subscribe({
      next: (v) => {
        if (!!v) {
          this.coursesService.updateCourse$({ ...course, ...v });
        }
      },
    });
  }


  deleteCourse(courseId: number): void {
    if(confirm('¿Está seguro de eliminar el curso?')){
      this.coursesService.deleteCourse$(courseId);
    }
  }
    

}
