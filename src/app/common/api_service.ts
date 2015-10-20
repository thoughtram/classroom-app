export class ApiService {
  cache:any = {};
  defaultErrorHandler: (response: any) => any = null;

  constructor (private $http: any, private config: any) {

  }

  setDefaultErrorHandler (errorHandler: (response: any) => any) {
    this.defaultErrorHandler = errorHandler;
  }

  getWorkshops () {
    if (!this.cache.workshops) {
      this.cache.workshops = this.$http({
                                  method: 'GET',
                                  url: this.config.API_ENDPOINT + '/secure/workshops',
                                  withCredentials: true
                                })
                                .then((response:any) => response.data.items, this.defaultErrorHandler);
    }

    return this.cache.workshops;
  }

  getWorkshop (name: string) {
    return this.getWorkshops()
               .then(
                 (workshops: Array<any>) => (<any>workshops).find((workshop:any) => workshop.classroom_url === name),
                 this.defaultErrorHandler
               )
  }



  getUser () {
    if (!this.cache.user) {
      this.cache.user = this.$http({
                              method: 'GET',
                              url: this.config.API_ENDPOINT + '/secure/user',
                              withCredentials: true
                            })
                            .then((response:any) => response.data.item, this.defaultErrorHandler);
    }

    return this.cache.user;
  }
}

ApiService.$inject = ['$http', 'config'];
