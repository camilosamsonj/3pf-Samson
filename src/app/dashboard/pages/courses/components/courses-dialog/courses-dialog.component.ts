import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../courses.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) private courseId?: number
  ){
    if (courseId) {
      this.coursesService.getCourseById$(courseId).subscribe({
        next: (c) => {
          if (c) {
            const formattedCourse = {
              ...c,
              startDate: c.startDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
              endDate: c.endDate.toISOString().split('T')[0],   // Formato YYYY-MM-DD
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