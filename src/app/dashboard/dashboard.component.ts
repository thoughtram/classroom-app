import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClassroomService } from '../classroom.service';
import { Course } from '../models/course';
import { HeaderComponent } from '../header';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [HeaderComponent]
})
export class DashboardComponent implements OnInit {

  courses: Observable<Array<Course>>;

  constructor(private classroomService: ClassroomService) {}

  ngOnInit() {
    this.courses = this.classroomService.getCourses();
  }
}
