  export default class {
    static $inject = ["$http"];
    constructor(private $http: ng.IHttpService) {}
    getWeather(lat: number, lng: number): ng.IHttpPromise<ForecastIO> {
      return this.$http.get(`/weather/${lat}/${lng}`);
    }
  }
