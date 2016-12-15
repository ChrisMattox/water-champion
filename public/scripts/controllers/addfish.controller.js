//dependencies and injectors must be in the same order because they reference eachother
app.controller("AddFishCtrl", ["$firebaseAuth", "$http", "FishDataFactory", "AuthDataFactory", "Upload", function($firebaseAuth, $http, FishDataFactory, AuthDataFactory, Upload) {

  var self = this;
  self.fishData = {};
  self.newFish = {};
  self.uploads = [];
  self.picData = {};
  self.currentUser = null;

  getPics();

  self.submit = function(){
    self.currentUser = AuthDataFactory.getCurrentUser();
    if(self.currentUser) {
      //promise and callback -- name for the function passing in
      self.currentUser.getToken().then(function(idToken){
        Upload.upload({
          url: '/fishData/test',
          method: 'POST',
          data: self.newFish,
          headers: {
            id_token: idToken
          }
        }).then(function (response) {
          getPics();
          console.log(self.picData);
        });
      });
    }
  }

  function getPics(){
    self.currentUser = AuthDataFactory.getCurrentUser();
    if(self.currentUser) {
      //promise and callback -- name for the function passing in
      self.currentUser.getToken().then(function(idToken){
        $http({
          url: '/fishData/test',
          method: 'GET',
          headers: {
            id_token: idToken
          }
        }).then(function (response) {
          FishDataFactory.setPicData(response.data);
          self.picData = FishDataFactory.picData();
          console.log("Pic Data from factory", self.picData);
        });
      });
    }
  }
}]);
