import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/dashboard/pages/courses/models/';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {

  

  @Input()
  dataSource: Course[] = [];
  displayedColumns = ['id', 'name', 'startDate', 'endDate', 'actions']

  @Output()
 editCourse = new EventEmitter<Course>();
  @Output()
 deleteCourse = new EventEmitter<number>();

}
