import { LocationPatchupService } from './location_patchup_service';

  export let ClassroomSlidedeckModule = angular.module('classroom.slidedeck', [])
  .service('locationPatchupService', LocationPatchupService)
  .run((locationPatchupService: LocationPatchupService) => {})
  .directive('crSlidedeck', () => {
    return {
        template: `
          <a class="thtrm-m-back-button" ng-href="#/class/{{ctrl.className}}">&larr; Overview</a>
          <iframe
            src="{{ctrl.iframeSrc}}"
            width="100%" height="100%">
          </iframe>`,
        controllerAs: 'ctrl',
        controller: function (config: any, $stateParams: any, $sce: ng.ISCEService) {
          this.className = $stateParams.className;
          var pageFragment = $stateParams.page ? '#/' + $stateParams.page : '';
          this.iframeSrc = $sce.trustAsResourceUrl(config.API_ENDPOINT + '/secure/'+ $stateParams.className + '/' + $stateParams.deckName + '/index.html' + pageFragment);
        }
    };
  })
  .config(($stateProvider: any) => {
    $stateProvider
      .state('slidedeck', {
        url: '/class/:className/:deckName',
        template:'<cr-slidedeck></cr-slidedeck>'
      })
      .state('slidedeck.page', {
        url: '/:page',
        template:'<cr-slidedeck></cr-slidedeck>'
      })
  });
