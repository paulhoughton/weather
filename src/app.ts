import {IAngularStatic} from "angular";
declare var angular:IAngularStatic
import {StateProvider, UrlRouterProvider, Transition} from "angular-ui-router";

import WeatherService from "./weatherService";
import LocationService from "./locationService";
import WeatherComponent from "./weatherComponent";
import WeatherWeekComponent from "./weatherWeekComponent";
import WeatherAppComponent from "./weatherAppComponent";

angular.module("weather.app", ["ui.router"])
  .service("weatherService", WeatherService)
  .service("locationService", LocationService)
  .component("weather", WeatherComponent)
  .component("weatherWeek", WeatherWeekComponent)
  .component("search", WeatherAppComponent)
  .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider:StateProvider, $urlRouterProvider:UrlRouterProvider) {

    const weekState = {
      name: 'week',
      url: '/week/{location}',
      views: {
        header: 'search',
        main: 'weatherWeek'
      },
      resolve: { location: ['$transition$',(transition:Transition) => transition.params()["location"] ]}
    }

    const dayState = {
      name: 'day',
      url: '/day/{location}',
      views: {
        header: 'search',
        main: 'weather'
      },
      resolve: { location: ['$transition$',(transition:Transition) => transition.params()["location"] ]}
    }

    $stateProvider.state("week", weekState);
    $stateProvider.state("day", dayState);
    $urlRouterProvider.otherwise('/day/London');
  }]);
