export default class {
  static $inject = ["$http", "$q"];
  constructor(private $http: ng.IHttpService, private $q: ng.IQService) { }
  getLatLon(location: string): ng.IPromise<GoogleGeocodeGeometry[]> {
    return this.$q((resolve, reject) => {
      this.$http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
        .then((res: {data: any}) => resolve(res.data.results))
        .catch(err => console.log(`Location HTTP error - ${err.statusText}`));
    });
  };
};
