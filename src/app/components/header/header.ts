
  export let ClassroomHeaderModule = angular.module('classroom.header', [])

  .directive('crHeader', () => {
    return {
      template: `
        <header role="banner" class="thtrm-l-header">
          <div class="thtrm-l-header__bar">
            <h1 class="thtrm-l-header__logo"><a href="/" title="thoughtram official website" aria-hidden="true">thoughtram</a></h1>
            <section class="thtrm-l-header__bar__actions">
              <div class="thtrm-m-dropdown">
                <img width="50" class="thtrm-m-dropdown__avatar" ng-src="{{ctrl.user.avatar_url}}&s=200">
                <div class="thtrm-m-dropdown__menu">
                  <ul class="thtrm-m-dropdown__menu__list">
                    <li class="thtrm-m-dropdown__menu__item">Signed in as {{ctrl.user.login}}</li>
                    <li class="thtrm-m-dropdown__menu__item"><a href="/logout">Sign out</a></li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </header>`,
        controllerAs: 'ctrl',
        controller: function (apiService) {
          apiService
            .getUser()
            .then(user => this.user = user);
        }
    }
  });
