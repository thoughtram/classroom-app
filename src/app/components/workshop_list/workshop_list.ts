import { ApiService } from '../../common/api_service';

export let ClassroomWorkshopListModule = angular.module('classroom.workshop_list', [])

.directive('crWorkshopList', () => {
  return {
    template: `
          <div ng-show="!ctrl.workshops" class="center-align">
            <cr-loading-spinner></cr-loading-spinner>
          </div>
          <ul class="thtrm-m-course-list thtrm-m-course-list--big">
            <li ng-repeat="workshop in ctrl.workshops">
                <a class="thtrm-m-course-box thtrm-m-course-box--big"
                   ng-class="{ 'thtrm-m-course-box--disabled':!workshop.enabled }"
                   ng-href="#/class/{{workshop.id}}">
                <div class="thtrm-m-course-box__banner">
                </div>
                <div class="thtrm-m-course-box__content">
                  <h4 class="thtrm-m-course-box__headline">{{workshop.title}}</h4>
                  <p class="thtrm-m-course-box__description">{{workshop.description}}</p>
                </div>
              </a>
            </li>
          </ul>`,
      controllerAs: 'ctrl',
      controller: function (apiService: ApiService) {
        apiService
          .getWorkshops()
          .then((workshops:any) => this.workshops = workshops);
      }
  };
})
.config(($stateProvider: any) => {
  $stateProvider
    .state('default.dashboard', {
      url: '/dashboard',
      template: '<cr-workshop-list></cr-workshop-list>'
    });
});
