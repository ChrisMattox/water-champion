app.controller("ViewFishCtrl", ["$firebaseAuth", "$http", "FishDataFactory", "AuthDataFactory", function($firebaseAuth, $http, FishDataFactory, AuthDataFactory) {
    var self = this;
    self.currentUser = null;
    self.fishData = {};

    getFishies();

    function getFishies(){
      self.currentUser = AuthDataFactory.getCurrentUser();
      if(self.currentUser) {
        console.log("Firebase User", self.currentUser);
        self.currentUser.getToken().then(function(idToken){
          FishDataFactory.setIdToken(idToken);
          if(FishDataFactory.fishData() == undefined) {
            FishDataFactory.updateFish().then(function(response) {
              self.fishData = FishDataFactory.fishData();
              return self.fishData;
            });
          } else {
            self.fishData = FishDataFactory.fishData();
            return self.fishData;
          }
        }).catch(function(error) {
          console.log("Authentication failed: ", error);
        });
      } else {
        console.log("Log in to get some data");
      }
    }

}]);
