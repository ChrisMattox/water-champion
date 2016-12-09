app.controller("ViewFishCtrl", ["$firebaseAuth", "$http", "FishDataFactory", "AuthDataFactory", function($firebaseAuth, $http, FishDataFactory, AuthDataFactory) {
    var self = this;
    self.currentUser = null;
    self.fishData = {};

    getFishies();

    function getFishies(){

      self.currentUser = AuthDataFactory.getCurrentUser();
      if(self.currentUser) {
        self.currentUser.getToken().then(function(idToken){
          FishDataFactory.setIdToken(idToken);
          // if(FishDataFactory.fishData() == undefined) {
            console.log("HEY HEY HEY");
            FishDataFactory.updateFish().then(function(response) {
              self.fishData = FishDataFactory.fishData();
              return self.fishData;
            });
          // } else {
          //   self.fishData = FishDataFactory.fishData();
          //   console.log("hitting on delete", self.fishData);
          //   return self.fishData;
          // }
        }).catch(function(error) {
          console.log("Authentication failed: ", error);
        });
      } else {
        console.log("Log in to get some data");
      }
    }

    self.deleteFish = function(thisFish){
      console.log("trying to delete THIS fish", thisFish);
      FishDataFactory.deleteFishies(thisFish).then(function(response){
      getFishies();
      });
    }
}]);
