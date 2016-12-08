app.controller("AddFishCtrl", ["$firebaseAuth", "$http", "FishDataFactory", "AuthDataFactory", function($firebaseAuth, $http, FishDataFactory) {

var self = this;
self.fishData = {};
self.newFish = {};

  self.addFish = function(newFish){
    console.log("CLICK ME OR DIE");
    FishDataFactory.addNewFish(newFish)
    .then(function(response){
      FishDataFactory.updateFish();
    })
  }

}]);
