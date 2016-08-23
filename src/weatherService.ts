import {IHttpService, IPromise} from 'angular';

export default class {
  static $inject = ["$http"];
  constructor(private $http: IHttpService) { }

  getWeekWeather(lat: number, lng: number): IPromise<{ data: ForecastIOWeek }> {
    return this.$http.get(`/weather/week/${lat}/${lng}`);
  }

  getWeather(lat: number, lng: number): IPromise<{ data: ForecastIODay }> {
    return this.$http.get(`/weather/day/${lat}/${lng}`);
  }
}
