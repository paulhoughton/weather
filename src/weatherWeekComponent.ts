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
      if (changes.location && changes.location.currentValue) {
        this.data = [];
        locationService.getLatLon(changes.location.currentValue).then(loc => {
          let { lat, lng } = loc[0].geometry.location;
          this.place = loc[0].formatted_address;
          weatherService.getWeekWeather(lat, lng).then(response => this.data = response.data);
        });
      }
    };
  }],
  template: `
    <div class="container-fluid">
      <div class="row" ng-repeat="value in $ctrl.data">
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