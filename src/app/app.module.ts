import { AppModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTER_DIRECTIVES, provideRouter, RouterModule } from '@angular/router';
import { APP_PROVIDERS } from './app.providers';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';

@AppModule({
  modules: [BrowserModule, RouterModule],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    provideRouter(AppRoutes),
    APP_PROVIDERS
  ],
  precompile: [AppComponent]
})
export class ApplicationModule {

  constructor(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent);
  }
}
