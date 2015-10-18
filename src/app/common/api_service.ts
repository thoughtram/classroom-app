export class ApiService {
  cache:any = {};

  constructor (private $http: any, private config: any) {

  }

  getWorkshops () {
    if (!this.cache.workshops) {
      this.cache.workshops = this.$http({
                                  method: 'GET',
                                  url: this.config.API_ENDPOINT + '/secure/workshops',
                                  withCredentials: true
                                })
                                .then(response => response.data.items);
    }

    return this.cache.workshops;
  }

  getWorkshop (name) {
    return this.getWorkshops()
               .then(workshops => workshops.find(workshop => workshop.classroom_url === name))
  }



  getUser () {
    if (!this.cache.user) {
      this.cache.user = this.$http({
                              method: 'GET',
                              url: this.config.API_ENDPOINT + '/secure/user',
                              withCredentials: true
                            })
                            .then(response => response.data.item);
    }

    return this.cache.user;
  }
}

ApiService.$inject = ['$http', 'config'];
