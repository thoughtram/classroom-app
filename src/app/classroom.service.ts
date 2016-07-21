import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { CLASSROOM_API_URL } from './app.tokens';

@Injectable()
export class ClassroomService {

  constructor(private http: Http, @Inject(CLASSROOM_API_URL) private apiUrl) {}

  getCourses() {
    return this.http.get(`${this.apiUrl}/api/workshops`)
                    .map(res => res.json())
                    .map(data => data.items);
  }
}
