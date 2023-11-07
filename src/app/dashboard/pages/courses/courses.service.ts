import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Course } from 'src/app/dashboard/pages/courses/models/';

@Injectable({ providedIn: 'root' })
export class CoursesService {

    courses: Course[] = [
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
    
    getCourses$(): Observable<Course[]> {
        return of(this.courses)
    }


}
