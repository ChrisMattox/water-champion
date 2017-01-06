//top fish contoller, controls login/out of app, displaying initial fish
app.controller("MapCtrl", ["$firebaseAuth", "$http", "FishDataFactory", "AuthDataFactory", function($firebaseAuth, $http, FishDataFactory, AuthDataFactory) {

  var self = this;
  self.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyChrXRweIuYscJifkOTpuH_6lQnKuTRjQA"
  self.fishData = {};
  self.message = "Hey!"

  getFishies();
  function getFishies(){
    self.currentUser = AuthDataFactory.getCurrentUser();
    if(self.currentUser) {
      self.currentUser.getToken().then(function(idToken){
        FishDataFactory.setIdToken(idToken);
        // if(FishDataFactory.fishData() == undefined) {
          FishDataFactory.updateFish().then(function(response) {
            self.fishData = FishDataFactory.fishData();
            console.log("Fish Data from map", self.fishData);
            return self.fishData;
          });
      }).catch(function(error) {
        console.log("Authentication failed: ", error);
      });
    } else {
      console.log("Log in to get some data");
    }
  }



}]);
