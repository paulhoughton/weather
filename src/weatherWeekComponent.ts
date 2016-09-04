import WeatherService from "./weatherService";
import LocationService from "./locationService";

class controller {
  current: ForecastIOWeek;
  place: string;

  static $inject = ["weatherService", "locationService"];
  constructor(private weatherService: WeatherService, private locationService: LocationService) { }

  $onChanges(changes: any) {
    if (!changes.location || !changes.location.currentValue) return false;

    this.current = [];
    this.locationService.getLatLon(changes.location.currentValue).then(loc => {
      let { lat, lng } = loc[0].geometry.location;
      this.place = loc[0].formatted_address;
      this.weatherService.getWeekWeather(lat, lng).then(response => this.current = response.data);
    });
  }
}

export default {
  bindings: {
    "location": "<"
  },
  controller,
  template: `
    <div class="container-fluid">
      <div class="row" ng-repeat="value in $ctrl.current">
        <div class="col-sm-2" ng-bind="::value.time*1000|date:'EEE'"></div>  
        <div class="col-sm-4">
          <i class="wi wi-forecast-io-{{::value.icon}}"></i>
          <span ng-bind="::value.temperatureMax | number:0"></span>
        </div>  
        <div class="col-sm-6" ng-bind="::value.summary"></div>  
      </div>
    </div>
  `
}