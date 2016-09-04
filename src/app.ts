import { IAngularStatic } from "angular";
declare var angular: IAngularStatic

import WeatherService from "./weatherService";
import LocationService from "./locationService";
import WeatherComponent from "./weatherComponent";
import WeatherWeekComponent from "./weatherWeekComponent";
import WeatherAppComponent from "./weatherAppComponent";
import Routes from "./routes";

angular.module("weather.app", ["ui.router"])
  .service("weatherService", WeatherService)
  .service("locationService", LocationService)
  .component("weather", WeatherComponent)
  .component("weatherWeek", WeatherWeekComponent)
  .component("search", WeatherAppComponent)
  .config(Routes);
