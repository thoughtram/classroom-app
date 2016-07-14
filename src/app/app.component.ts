import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ClassroomService } from './classroom.service';
import { Course } from './models/course';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  courses: Observable<Array<Course>>;

  constructor(private http: Http, private classroomService: ClassroomService) {}

  ngOnInit() {
    this.courses = this.classroomService.getCourses();
  }
}
