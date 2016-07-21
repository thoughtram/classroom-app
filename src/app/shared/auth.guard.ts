import { Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CLASSROOM_API_URL } from '../app.tokens';

export class AuthGuard implements CanActivate {

  constructor(@Inject(Router) private router, @Inject(CLASSROOM_API_URL) private apiUrl) {}

  canActivate() {
    if (document.cookie.indexOf('__CLASSROOM_SESSION') === -1) {
      console.log('no cookie');
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
