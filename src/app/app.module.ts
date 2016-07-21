import { AppModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTER_DIRECTIVES, provideRoutes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { APP_PROVIDERS } from './app.providers';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';

@AppModule({
  modules: [BrowserModule, RouterModule],
  providers: [
    provideRoutes(AppRoutes),
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    APP_PROVIDERS
  ],
  precompile: [AppComponent]
})
export class ApplicationModule {

  constructor(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent);
  }
}
