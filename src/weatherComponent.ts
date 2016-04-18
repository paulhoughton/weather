import WeatherService from "./weatherService";
import LocationService from "./locationService";

export default {
  bindings: {
    "location": "<"
  },
  controller: ["weatherService", "locationService", function (weatherService: WeatherService, locationService: LocationService) {
    const daySecs = 60 * 60 * 24;
    this.overnight = (time: number) => (time > this.current.sunrise && time > this.current.sunset && time < this.current.sunrise + daySecs) || time < this.current.sunrise;
    this.$onChanges = (changes: any) => {
      if (changes.location) {
        this.current = [];
        locationService.getLatLon(changes.location.currentValue).then(loc => {
          let { lat, lng } = loc[0].geometry.location;
          this.place = loc[0].formatted_address;
          weatherService.getWeather(lat, lng).then(response => {
            this.current = response.data;
            this.current.timezoneOffset = (this.current.offset > 0 ? "+" : "") + this.current.offset;
          });
        });
      }
    };
  }],
  template: `
    <div class="container-fluid">
      <div class="row" ng-repeat="value in $ctrl.current.hourly" ng-class="::{overnight: $ctrl.overnight(value.time)}">
        <div class="col-sm-2 col-md-offset-2" ng-bind="::value.time*1000|date:'HH:00':'{{::$ctrl.current.timezoneOffset}}'"></div>  
        <div class="col-sm-4 col-md-2">
          <i class="wi wi-forecast-io-{{::value.icon}}"></i>
          <span  ng-bind="::value.temperature | number:0"></span>
        </div>  
        <div class="col-sm-6" ng-bind="::value.summary"></div>  
      </div>
    </div>
  `
}