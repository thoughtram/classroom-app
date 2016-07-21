/* tslint:disable:no-unused-variable */

// import {
//   beforeEach,
//   addProviders,
//   describe, xdescribe,
//   expect, it, xit,
//   async, inject
// } from '@angular/core/testing';
// import { ClassroomService } from './classroom.service';
// import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';


// describe('Classroom Service', () => {

//   let service;
//   let mockBackend;

//   beforeEach(() => {
//     addProviders([
//       ClassroomService,
//       MockBackend,
//       BaseRequestOptions,
//       {
//         provide: Http,
//         useFactory: (backend, options) => new Http(backend, options),
//         deps: [MockBackend, BaseRequestOptions]
//       }
//     ]);
//   });

//   beforeEach(inject([ClassroomService, MockBackend], (_service, _mockBackend) => {
//     service = _service;
//     mockBackend = _mockBackend;
//   }));

//   describe('getContacts()', () => {

//     it('should return an Observable<Array<Course>>', done => {
//       let response = {
//         items: [
//           { id: 'course-id', title: 'Course Title', description: 'Course Description' }
//         ]
//       };

//       mockBackend.connections.subscribe(connection => {
//         let responseOptions = new ResponseOptions({body: JSON.stringify(response)});
//         connection.mockRespond(new Response(responseOptions));
//       });

//       service.getCourses().subscribe(courses => {
//         expect(courses.length).toBe(1);
//         expect(courses[0].id).toEqual('course-id');
//         expect(courses[0].title).toEqual('Course Title');
//         expect(courses[0].description).toEqual('Course Description');
//         done();
//       });
//     });
//   });

// })
