import { StateService } from "angular-ui-router";


export default {
  bindings: {
    location: "<"
  },
  controller: class {
    location: string;
    static $inject = ["$state"];
    constructor(private $state: StateService) { };

    goToLocation() {
      this.$state.go(".", { location: this.location })
    }
  },
  template: `
    <form ng-submit="$ctrl.goToLocation()">
      <input type="text" ng-model="$ctrl.location" placeholder="Enter a location" required autofocus/>
      <input type="submit" class="btn btn-primary" value="Go!"></input>
    </form>
    <a class="btn" ui-sref="day({location:$ctrl.location})" ui-sref-active="btn-primary">Day</a>
    <a class="btn" ui-sref="week({location:$ctrl.location})" ui-sref-active="btn-primary">Week</a>
  `
}