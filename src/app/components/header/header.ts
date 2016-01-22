import {Component, Inject} from 'angular2/core';
import {ApiService} from '../../common/api_service';

@Component({
  selector: 'cr-header',
  template: `
    <header role="banner" class="thtrm-l-header">
      <div class="thtrm-l-header__bar">
        <h1 class="thtrm-l-header__logo"><a href="/" title="thoughtram official website" aria-hidden="true">thoughtram</a></h1>
        <section class="thtrm-l-header__bar__actions">
          <div class="thtrm-m-dropdown">
            <img width="50" class="thtrm-m-dropdown__avatar" src="{{user?.avatar_url}}&s=200">
            <div class="thtrm-m-dropdown__menu">
              <ul class="thtrm-m-dropdown__menu__list">
                <li class="thtrm-m-dropdown__menu__item">Signed in as {{user?.login}}</li>
                <li class="thtrm-m-dropdown__menu__item"><a href="{{apiEndpoint}}/logout">Sign out</a></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </header>
  `
})
export class ClassroomHeader {

  user: any;
  apiEndpoint: string;

  constructor(apiService: ApiService, @Inject('config') config: any) {
    this.apiEndpoint = config.API_ENDPOINT;
    apiService
      .getUser()
      .then((user: any) => this.user = user);
  }
}
