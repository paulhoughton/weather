import { StateProvider, UrlRouterProvider, Transition } from "angular-ui-router";

export default class {
  static $inject = ["$stateProvider", "$urlRouterProvider"];

  constructor($stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider) {

    const param = (paramId: string) =>
      ["$transition$", (transition: Transition) => transition.params()[paramId]]

    $stateProvider.state("week", {
      name: "week",
      url: "/week/{location}",
      views: {
        header: "search",
        main: "weatherWeek"
      },
      resolve: { location: param("location") }
    });

    $stateProvider.state("day", {
      name: "day",
      url: "/day/{location}",
      views: {
        header: "search",
        main: "weather"
      },
      resolve: { location: param("location") }
    });

    $urlRouterProvider.otherwise("/day/London");

  }

}
