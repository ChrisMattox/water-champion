app.controller("AddFishCtrl", ["$firebaseAuth", "$http", "FishDataFactory", "AuthDataFactory", function($firebaseAuth, $http, FishDataFactory) {

var self = this;
self.fishData = {};
self.newFish = {};

  self.addFish = function(){
    FishDataFactory.addNewFish(self.newFish)
    .then(function(response){
      FishDataFactory.updateFish();
      self.newFish = {};
    })
  }

}]);
