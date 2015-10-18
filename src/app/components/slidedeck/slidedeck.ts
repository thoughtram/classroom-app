
  export let ClassroomSlidedeckModule = angular.module('classroom.slidedeck', [])

  .directive('crSlidedeck', () => {
    return {
        template: `
          <a class="thtrm-m-back-button" ng-href="#/class/{{ctrl.className}}">&larr; Overview</a>
          <iframe
            id="slideframe"
            src="{{ctrl.iframeSrc}}"
            width="100%" height="100%">
          </iframe>`,
        controllerAs: 'ctrl',
        controller: function (config, apiService, $stateParams, $sce) {
          this.className = $stateParams.className;
          this.iframeSrc = $sce.trustAsResourceUrl(config.API_ENDPOINT + '/secure/'+ $stateParams.className + '/' + $stateParams.deckName + '/index.html');
        }
    };
  })
  .config(($stateProvider) => {
    $stateProvider
      .state('slidedeck', {
        url: '/class/:className/:deckName',
        template:'<cr-slidedeck></cr-slidedeck>'
      });
  });
