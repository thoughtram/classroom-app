export class LocationPatchupService {
  constructor ($stateParams: any, config: any, $window: any) {
    $window.addEventListener( 'message', function( event ) {
        var data = JSON.parse( event.data );
        if( data.namespace === 'reveal' && data.eventName === 'slidechanged' ) {
          let page = data.state.indexh > 0 ? '/' + data.state.indexh : '';
          $window.location.hash = '#/class/' + $stateParams.className + '/' + $stateParams.deckName + page;
        }
    });
  }
}

LocationPatchupService.$inject = ['$stateParams', 'config', '$window']
