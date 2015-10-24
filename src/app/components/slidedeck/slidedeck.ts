import { LocationPatchupService } from './location_patchup_service';
import { ApiService } from '../../common/api_service';

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
        controller: function (config: any, $stateParams: any, $sce: ng.ISCEService, apiService: ApiService) {

          // That's a bit of a hack. We can't figure out if the iframe failed
          // to load when the user isn't logged in. The same origin policy prevents
          // us from getting such insights.
          // Instead we figure out if the user is logged in by trying to use
          // the API. If it fails, the global error handler will do the redirect
          // for us.
          apiService.getUser();

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
