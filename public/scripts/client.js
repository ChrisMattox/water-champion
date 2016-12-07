var app = angular.module("waterChampionApp", ["firebase", "ngRoute"]);

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
    controller: 'viewFishCtrl',
    controllerAs: 'vfc'
  })
  .otherwise({
    redirectTo: 'topfish'
  });
}]); //close app.config


app.controller("viewFishCtrl", ["$http", function($firebaseAuth, $http) {
    var self = this;

}]);
