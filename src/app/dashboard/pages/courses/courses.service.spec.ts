import { TestBed, inject } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { of } from 'rxjs';
import { formatDate } from '@angular/common';

describe('CoursesService', () => {
  let coursesService: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
    });
    coursesService = TestBed.inject(CoursesService);
  });

  it('should be created', () => {
    expect(coursesService).toBeTruthy();
  });

  it('should get courses successfully', inject([CoursesService], (service: CoursesService) => {
    service.getCourses$().subscribe(courses => {
      expect(courses[0].startDate.getDate()).toEqual(20);
      expect(courses[0].endDate.getDate()).toEqual(20);
  
      expect(courses[1].startDate.getDate()).toEqual(20);
      expect(courses[1].endDate.getDate()).toEqual(20);
    });
  }));
  

  it('should create a course successfully', () => {
    const mockCourse = { id: 3, name: 'TypeScript', startDate: new Date(), endDate: new Date() };

    coursesService.createCourse$(mockCourse).subscribe((courses) => {
      expect(courses).toContain(mockCourse);
    });
  });

  // Add more tests for editCourse$, deleteCourse$, getCourseById$ as needed
});
