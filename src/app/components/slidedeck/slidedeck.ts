import { LocationPatchupService } from './location_patchup_service';
import { ApiService } from '../../common/api_service';

  export let ClassroomSlidedeckModule = angular.module('classroom.slidedeck', [])
  .service('locationPatchupService', LocationPatchupService)
  .run((locationPatchupService: LocationPatchupService) => {})
  .directive('crSlidedeck', () => {
    return {
        template: `
          <a class="thtrm-m-back-button" ng-href="#/class/{{ctrl.workshop.id}}">&larr; Overview</a>
          <iframe
            src="{{ctrl.iframeSrc}}"
            width="100%" height="100%">
          </iframe>`,
        controllerAs: 'ctrl',
        controller: function (config: any, $stateParams: any, $sce: ng.ISCEService, apiService: ApiService) {

          // If this fails because the user isn't logged in, our default error handler
          // will take care of automatically redirecting to /login. It's also the only
          // way to handle this as the same origin policy prevents us from getting
          // any insights wether the iframe could be loaded or not.
          apiService
            .getWorkshop($stateParams.className)
            .then((workshop:any) => {
              //TODO: could use a polyfill to use `find` here
              var decks = workshop.decks.filter((deck: any) => deck.id === $stateParams.deckName);
              if (decks.length > 0) {
                this.deck = decks[0];
                this.workshop = workshop;
                var pageFragment = $stateParams.page ? '#/' + $stateParams.page : '';
                this.iframeSrc = $sce.trustAsResourceUrl(config.API_ENDPOINT + this.deck.path + pageFragment);
              }
            })
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
