import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Course } from 'src/app/dashboard/pages/courses/models/';

@Injectable({ providedIn: 'root' })
export class CoursesService {

    private coursesSubject = new BehaviorSubject<Course[]>([]);

    constructor(){
        // this.coursesSubject.next(this.courses);
        this.loadCourses();
    }

    private loadCourses(): void {
        const courses: Course[] = [
            {
                id: 1,
                name: 'JavaScript',
                startDate: new Date(),
                endDate: new Date(),
            },
            {
                id: 2,
                name: 'Python',
                startDate: new Date(),
                endDate: new Date(),
            }
        ];
        this.coursesSubject.next(courses);
    }
   

    getCourses$(): Observable<Course[]> {
        return this.coursesSubject.asObservable();
    }

    createCourse$(payload: Course): Observable<Course[]> {
        const currentCourses = this.coursesSubject.value;
        this.coursesSubject.next([... currentCourses, payload ]);
        return this.getCourses$();
    }

    updateCourse$(updatedCourse: Course): Observable<Course[]> {
        const currentCourse = this.coursesSubject.value;
        const updatedCourses = currentCourse.map((course) =>
          course.id === updatedCourse.id ? { ...course, ...updatedCourse } : course
        );
        this.coursesSubject.next(updatedCourses);
        return this.getCourses$(); 
      }
    
    deleteCourse$(courseId: number): void {
    const currentCourses= this.coursesSubject.value;
    const filteredCourses = currentCourses.filter((course) => course.id !== courseId);
    this.coursesSubject.next(filteredCourses);
    }


}
