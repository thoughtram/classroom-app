import { Component, Inject, OnInit } from '@angular/core';
import { CLASSROOM_API_URL } from '../app.tokens';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(CLASSROOM_API_URL) private apiUrl) {}

  ngOnInit() {
  }

}
