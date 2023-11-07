import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../courses.service';
import { Course } from '../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss']
})
export class CoursesDialogComponent {
  
  // nameControl = new FormControl();
  // startDateControl = new FormControl();
  // endDateControl = new FormControl();
  
  
  // courseForm = new FormGroup({
  //   name: this.nameControl,
  //   startDate: this.startDateControl,
  //   endDate: this.endDateControl,
  
  courseForm : FormGroup;
  constructor(
    private coursesService: CoursesService,  
    private matDialogRef:
    MatDialogRef<CoursesDialogComponent>, 
    private fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public course?: Course,
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]

    });
    if (this.course) {
      this.courseForm.patchValue(this.course);
    }
  }


  onSubmit(): void {
    if (this.courseForm.invalid){
      return this.courseForm.markAllAsTouched();
    } else {

      const formValue = this.courseForm.value;

      const newCourse: Course = {
        id: this.course ? this.course.id : Math.floor(Math.random()* 1000000),
        name: formValue.name,
        startDate: formValue.startDate,
        endDate: formValue.endDate
      };

      
      if (this.course){
        this.coursesService.updateCourse$(newCourse)
        .subscribe(()=> this.matDialogRef.close());
      } else {
        this.coursesService.createCourse$(newCourse)
        .subscribe(() => this.matDialogRef.close());
      }

    }
  }
}