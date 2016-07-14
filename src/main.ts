import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { APP_PROVIDERS } from './app/app.providers';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_PROVIDERS
]);

