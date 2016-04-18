import WeatherService from "./weatherService";
import LocationService from "./locationService";
import WeatherComponent from "./weatherComponent";
import WeatherAppComponent from "./weatherAppComponent";

angular.module("weather.app", [])
  .service("weatherService", WeatherService)
  .service("locationService", LocationService)
  .component("weather", WeatherComponent)
  .component("weatherApp", WeatherAppComponent);
