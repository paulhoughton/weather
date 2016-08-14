import * as angular from 'angular';

export default class {
  static $inject = ["$http"];
  constructor(private $http: angular.IHttpService) { }

  getWeekWeather(lat: number, lng: number): angular.IPromise<{ data: ForecastIOWeek }> {
    return this.$http.get(`/weather/week/${lat}/${lng}`);
  }

  getWeather(lat: number, lng: number): angular.IPromise<{ data: ForecastIODay }> {
    return this.$http.get(`/weather/day/${lat}/${lng}`);
  }
}
