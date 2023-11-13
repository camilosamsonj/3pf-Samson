import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../courses.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss']
})
export class CoursesDialogComponent {
  
  nameControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  startDateControl = new FormControl('', [Validators.required]);
  endDateControl = new FormControl('', [Validators.required]);
  
  
  courseForm = new FormGroup({
    name: this.nameControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl,
  });
  
  constructor(
    private matDialogRef: MatDialogRef<CoursesDialogComponent>, 
    private coursesService: CoursesService, 
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) private courseId?: number
  ){
    if (courseId) {
      this.coursesService.getCourseById$(courseId).subscribe({
        next: (c) => {
          if (c) {
            const formattedCourse = {
              ...c,
              startDate: c.startDate ? this.datePipe.transform(c.startDate, 'yyyy-MM-dd') : null ,
              endDate: c.endDate ? this.datePipe.transform(c.endDate, 'yyyy-MM-dd') : null,
            };

            this.courseForm.patchValue(formattedCourse);
          }
        },
      });
    }
  }

  public get isEditing(): boolean {
    return !!this.courseId;
  }
  
   
  onSubmit(): void {
    if (this.courseForm.invalid){
      return this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.courseForm.value);

    }
  }
}