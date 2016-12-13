//dependencies and injectors must be in the same order because they reference eachother
app.controller("AddFishCtrl", ["$firebaseAuth", "$http", "FishDataFactory", "AuthDataFactory", "Upload", function($firebaseAuth, $http, FishDataFactory, AuthDataFactory, Upload) {

  var self = this;
  self.fishData = {};
  self.newFish = {};
  self.uploads = [];
  self.picData = [];
  self.currentUser = null;

  getPics();

  self.addFish = function(){
    FishDataFactory.addNewFish(self.newFish)
    .then(function(response){
      FishDataFactory.updateFish();
      self.newFish = {};
    })
  }

  self.submit = function(){
    self.currentUser = AuthDataFactory.getCurrentUser();
    if(self.currentUser) {
      //promise and callback -- name for the function passing in
      self.currentUser.getToken().then(function(idToken){
        Upload.upload({
          url: '/uploads/test',
          method: 'POST',
          data: self.upload,
          headers: {
            id_token: idToken
          }
        }).then(function (response) {
          self.uploads.push(response.data);
          FishDataFactory.setPicData(self.uploads);
          self.picData = FishDataFactory.picData();
          console.log("HEYYYOOO HOTDOG", self.picData);
        });
      });
    }
  }

  // $http.get('/uploads').then(function(response){
  //   console.log(response.data);
  //   this.uploads = response.data;
  // });

  function getPics(){
    self.currentUser = AuthDataFactory.getCurrentUser();
    if(self.currentUser) {
      //promise and callback -- name for the function passing in
      self.currentUser.getToken().then(function(idToken){
        $http({
          url: '/uploads/test',
          method: 'GET',
          headers: {
            id_token: idToken
          }
        }).then(function (response) {
          console.log(response.data);
        });
      });
    }
  }
}]);
