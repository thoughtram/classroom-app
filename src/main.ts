import { bootstrapModule } from '@angular/core';
import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './app/';
import { ApplicationModule } from './app/app.module';
import 'rxjs/add/operator/map';

if (environment.production) {
  enableProdMode();
}

bootstrapModule(ApplicationModule, browserDynamicPlatform());

