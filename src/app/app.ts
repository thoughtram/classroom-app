/// <reference path='../../dts/angular/angular.d.ts' />
import {CONFIG} from './common/config';
import {ApiService} from './common/api_service';
import {ClassroomWorkshopListModule} from './components/workshop_list/workshop_list';
import {ClassroomWorkshopModule} from './components/workshop/workshop';
import {ClassroomSlidedeckModule} from './components/slidedeck/slidedeck';
import {ClassroomLoginModule} from './components/login/login';
import {ClassroomLoadingSpinnerModule} from './components/loading_spinner/loading_spinner';

import 'reflect-metadata';
import {adapter} from './upgrade_adapter';

import {ClassroomHeader} from './components/header/header';


var app = angular.module('classroom', [
  'ui.router',
  ClassroomWorkshopListModule.name,
  ClassroomWorkshopModule.name,
  ClassroomSlidedeckModule.name,
  ClassroomLoginModule.name,
  ClassroomLoadingSpinnerModule.name
]);

app.service('apiService', ApiService);
app.run((apiService: ApiService, $state: any, $location: ng.ILocationService, $q: ng.IQService) => {
  apiService.setDefaultErrorHandler((response) => {
    let path = $location.path();
    // it's important to check for the /login page here. Otherwise it may be
    // that another request fails while we are already on the /login page
    // which would redirect to /login twice and then set jump_to=/login
    // leaving the original jump_to in the nirvana.
    if (path.indexOf('login') === -1) {
      $state.go('login', {jump_to: $location.path() });
    }
    return $q.reject(response);
  })
});
app.value('config', CONFIG);

app.config(($stateProvider: any, $urlRouterProvider: any) => {
  $stateProvider
    .state('default', {
      abstract: true,
      template: `
        <cr-header></cr-header>
        <section class="thtrm-l-main">
          <div class="thtrm-l-constraint">
            <ui-view></ui-view>
          </div>
        </section>`
    });

    $urlRouterProvider.otherwise('/dashboard');
});

app.directive('crHeader', adapter.downgradeNg2Component(ClassroomHeader));
adapter.upgradeNg1Provider('apiService', {asToken: ApiService})
adapter.upgradeNg1Provider('config', {asToken: 'config'})
adapter.bootstrap(document.body, ['classroom'], {
  strictDi: true
});
