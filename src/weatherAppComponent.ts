export default {
  bindings: {
    "input": "@default"
  },
  controller: function() {
    this.newLocation = () => this.location = this.input;
  },
  template: `
    <form ng-submit="$ctrl.newLocation()">
      <input type="text" ng-model="$ctrl.input" placeholder="Enter a location" required autofocus/>
      <input type="submit" class="btn btn-primary" value="Go"></input>
    </form>
    <weather location="$ctrl.location"></weather>
  `
}