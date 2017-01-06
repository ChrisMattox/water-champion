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
      EXIF.getData(self.newFish.file, function() {

        var lat = EXIF.getTag(this, "GPSLatitude");
        var long = EXIF.getTag(this, "GPSLongitude");
        var orientation = EXIF.getTag(this, "Orientation");
        var make = EXIF.getTag(this, "Make");

        var toDecimal = function (number) {
        return number[0].numerator + number[1].numerator /
        (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
        };

        self.newFish.lat = String(toDecimal(lat));
        self.newFish.long = ("-" + toDecimal(long));
        self.newFish.make = make;

        self.currentUser.getToken().then(function(idToken){
          console.log("New Fish Before Post", self.newFish);
          Upload.upload({
            url: '/fishData/test',
            method: 'POST',
            data: self.newFish,
            headers: {
              id_token: idToken
            }
          }).then(function (response) {
            getPics();
            self.newFish = {};
          });
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
        });
      });
    }
  }

  // function getExif(file) {
  //   EXIF.getData(file, function() {
  //     var lat = EXIF.getTag(this, "GPSLatitude");
  //     var long = EXIF.getTag(this, "GPSLongitude");
  //
  //     var toDecimal = function (number) {
  //     return number[0].numerator + number[1].numerator /
  //     (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
  //     };
  //
  //     self.newFish.lat = String(toDecimal(lat));
  //     self.newFish.long = ("-" + toDecimal(long));
  //
  //   });
  //   return self.newFish;
  // }
}]);
