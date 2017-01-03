app.controller("StandingsCtrl", ["$firebaseAuth", "$http", "FishDataFactory", "AuthDataFactory", function($firebaseAuth, $http, FishDataFactory, AuthDataFactory) {

  var self = this;
  self.fishData = {};

  getFishies();
  console.log(self.fishData);

  // function getPics(){
  //   self.currentUser = AuthDataFactory.getCurrentUser();
  //   if(self.currentUser) {
  //     //promise and callback -- name for the function passing in
  //     self.currentUser.getToken().then(function(idToken){
  //       $http({
  //         url: '/fishData/test',
  //         method: 'GET',
  //         headers: {
  //           id_token: idToken
  //         }
  //       }).then(function (response) {
  //         FishDataFactory.setPicData(response.data);
  //         self.picData = FishDataFactory.picData();
  //         console.log("Pic Data from factory", self.picData);
  //       });
  //     });
  //   }
  // }

  function getFishies(){
    self.currentUser = AuthDataFactory.getCurrentUser();
    if(self.currentUser) {
      self.currentUser.getToken().then(function(idToken){
        FishDataFactory.setIdToken(idToken);
        // if(FishDataFactory.fishData() == undefined) {
          FishDataFactory.updateFish().then(function(response) {
            self.fishData = FishDataFactory.fishData();
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
