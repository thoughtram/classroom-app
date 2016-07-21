import { HTTP_PROVIDERS } from '@angular/http';
import { ClassroomService } from './classroom.service';
import { CLASSROOM_API_URL } from './app.tokens';
import { AuthGuard } from './shared/auth.guard';


export const APP_PROVIDERS = [
  HTTP_PROVIDERS,
  ClassroomService,
  { provide: CLASSROOM_API_URL, useValue: 'http://localhost:3000' },
  AuthGuard
];
