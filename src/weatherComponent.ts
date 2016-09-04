import WeatherService from "./weatherService";
import LocationService from "./locationService";

const daySecs = 60 * 60 * 24;

class controller {
  current?: ForecastIODay;
  place: string;
  timezoneOffset: string;

  static $inject = ["weatherService", "locationService"];
  constructor(private weatherService: WeatherService, private locationService: LocationService) {}

  $onChanges(changes: any) {
    if (!changes.location || !changes.location.currentValue) return false;

    this.current = undefined;
    this.locationService.getLatLon(changes.location.currentValue).then(loc => {
      let { lat, lng } = loc[0].geometry.location;
      this.place = loc[0].formatted_address;
      this.weatherService.getWeather(lat, lng).then(response => {
        this.current = response.data;
        this.timezoneOffset = (this.current.offset > 0 ? "+" : "") + this.current.offset;
      });
    });
  };

  overnight(time: number) {
    return !!this.current && ((time > this.current.sunrise && time > this.current.sunset && time < this.current.sunrise + daySecs) || time < this.current.sunrise)
  };

}

export default {
  bindings: {
    "location": "<"
  },
  controller,
  template: `
    <div class="container-fluid">
      <div class="row" ng-repeat="value in $ctrl.current.hourly" ng-class="::{overnight: $ctrl.overnight(value.time)}">
        <div class="col-sm-2 col-md-2 offset-md-2" ng-bind="::value.time*1000|date:'HH:00':'{{::$ctrl.timezoneOffset}}'"></div>  
        <div class="col-sm-4 col-md-2">
          <i class="wi wi-forecast-io-{{::value.icon}}"></i>
          <span ng-bind="::value.temperature | number:0"></span>
        </div>  
        <div class="col-sm-6" ng-bind="::value.summary"></div>  
      </div>
    </div>
  `
}