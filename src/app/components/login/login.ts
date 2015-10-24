export let ClassroomLoginModule = angular.module('classroom.login', [])
.directive('crLogin', () => {
  return {
      template: `
        <div class="wrapper">
          <div>
          <h1 class="thtrm-m-login-headline">Welcome to classroom</h1>
          <div class="thtrm-m-box thtrm-m-loginbox">
            <img class="thtrm-m-loginbox__avatar" width="110" src="/images/classroom-login-placeholder.png">
            <p class="thtrm-m-loginbox__text">Please log in to view workshop material.</p>
            <a class="login-button" title="Sign in with GitHub" ng-href="{{ctrl.apiEndpoint}}/login?jump_to={{ctrl.jumpTo}}">Sign in with Github</a>
          </div>
          </div>
        </div>`,
      controllerAs: 'ctrl',
      controller: function (config: any, $stateParams: any) {
        this.apiEndpoint = config.API_ENDPOINT;
        this.jumpTo = $stateParams.jump_to;
      }
  };
})
.config(($stateProvider: any) => {
  $stateProvider
    .state('login', {
      url: '/login?jump_to',
      template:'<cr-login></cr-login>'
    });
})
.directive('crLoginFail', () => {
  return {
      template: `
        <div class="wrapper">
          <div>
          <h1 class="thtrm-m-login-headline">Welcome to classroom</h1>
          <div class="thtrm-m-box thtrm-m-loginbox">
            <img class="thtrm-m-loginbox__avatar" width="110" src="/images/classroom-login-placeholder.png">
            <p class="thtrm-m-loginbox__text">Please log in to view workshop material.</p>
            <a class="login-button" title="Sign in with GitHub" ng-href="{{ctrl.apiEndpoint}}/login">Sign in with Github</a>
          </div>
          <p class="thtrm-m-loginbox__text thtrm-m-loginbox__text--fail">Pity! Looks like you haven't attended any of our classes.<br>Otherwise drop us a line at hello@thoughtram.io</p>
          </div>
        </div>`,
      controllerAs: 'ctrl',
      controller: function (config: any, $stateParams: any) {
        this.apiEndpoint = config.API_ENDPOINT;
        this.jumpTo = $stateParams.jump_to;
      }
  };
})
.config(($stateProvider: any) => {
  $stateProvider
    .state('login-fail', {
      url: '/login-fail?jump_to',
      template:'<cr-login-fail></cr-login-fail>'
    });
});
