import { ApiService } from '../../common/api_service';

export let ClassroomWorkshopModule = angular.module('classroom.workshop', [])

.directive('crWorkshop', () => {
  return {
      template: `
        <h2 class="thtrm-m-course-headline">{{ctrl.workshop.title}}</h2>
        <p class="thtrm-m-course-description">{{ctrl.workshop.description}}</p>
        <ul class="thtrm-m-course-list">
          <li ng-repeat="deck in ctrl.workshop.decks">
            <a ng-href="#/class/{{ctrl.workshop.classroom_url}}/{{deck.path}}" class="thtrm-m-course-box">
              <div class="thtrm-m-course-box__banner">
              </div>
              <div class="thtrm-m-course-box__content">
                <h4 class="thtrm-m-course-box__headline">{{deck.title}}</h4>
                <p class="thtrm-m-course-box__description">{{deck.description}}</p>
              </div>
            </a>
          </li>
        </ul>`,
      controllerAs: 'ctrl',
      controller: function (apiService: ApiService, $stateParams: any) {
        apiService
          .getWorkshop($stateParams.className)
          .then((workshop:any) => this.workshop = workshop);
      }
  };
})
.config(($stateProvider: any) => {
  $stateProvider
    .state('default.workshop', {
      url: '/class/:className',
      template:'<cr-workshop></cr-workshop>'
    });
});
