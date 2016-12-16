app.controller("StandingsCtrl", ["$firebaseAuth", "$http", "FishDataFactory", "AuthDataFactory", function($firebaseAuth, $http, FishDataFactory, AuthDataFactory) {

  var self = this;
  self.allFish = {};

  getAllFish();

  function getAllFish(){
    $http.get('/fishData/allFish')
    .then(function(response){
      self.allFish = response.data;
    });
  }
}]);
