describe("Weather component", () => {
  var $httpBackend: ng.IHttpBackendService;
  beforeEach(module("weather.app"));
  beforeEach(function () {
    fixture.setBase("tests");

    inject(function (_$httpBackend_: ng.IHttpBackendService) {
      $httpBackend = _$httpBackend_;
      $httpBackend.whenGET(/weather.*/).respond(fixture.load("weather.json"));
      $httpBackend.whenGET(/maps.googleapis.com\/maps\/api\/geocode\/.*/).respond(fixture.load("geocode.json"));
    });
  });

  it("Should render component", () => {
    inject(function ($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) {
      var scope = $rootScope.$new();
      var element = angular.element("<weather location='location'></weather>");
      element = $compile(element)(scope);
      scope.location = "Anywhere";
      scope.$apply();
      $httpBackend.flush();
      expect(element.html()).toContain("12:00");
      expect(element.find("i").length).toBe(24);
    })
  })
})