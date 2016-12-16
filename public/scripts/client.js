var app = angular.module("waterChampionApp", ["firebase", "ngRoute","ngFileUpload", "ngMap"]);

//setting up routes for angular controllers. stretch goal is to have only this
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/topfish', {
    templateUrl: '/views/templates/topfish.html',
    controller: 'TopFishCtrl',
    controllerAs: 'tfc'
  })
  .when('/addfish', {
    templateUrl: '/views/templates/addfish.html',
    controller: 'AddFishCtrl',
    controllerAs: 'afc'
  })
  .when('/viewfish', {
    templateUrl: '/views/templates/viewfish.html',
    controller: 'ViewFishCtrl',
    controllerAs: 'vfc'
  })
  .when('/map', {
    templateUrl: '/views/templates/map.html',
    controller: 'MapCtrl',
    controllerAs: 'mc'
  })
  .when('/standings', {
    templateUrl: '/views/templates/standings.html',
    controller: 'StandingsCtrl',
    controllerAs: 'sc'
  })
  .otherwise({
    redirectTo: 'topfish'
  });
}]); //close app.config
