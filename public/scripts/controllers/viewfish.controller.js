app.controller("ViewFishCtrl", ["$firebaseAuth", "$http", "FishDataFactory", "AuthDataFactory", function($firebaseAuth, $http, FishDataFactory, AuthDataFactory) {
  var self = this;
  self.currentUser = null;
  self.fishData = {};
  self.gearArray = [];
  self.lakeArray = [];
  self.breedArray = [];
  self.weightArray = [];
  self.fishLengthArray = [];
  self.avgFish = [];

  getFishies();

// lets go fishing and get some data
  function getFishies(){
    self.currentUser = AuthDataFactory.getCurrentUser(); //authentication
    if(self.currentUser) {
      self.currentUser.getToken().then(function(idToken){
        FishDataFactory.setIdToken(idToken); //nab the token for the factory
        FishDataFactory.updateFish().then(function(response) {
          self.fishData = FishDataFactory.fishData();
          // loop over fishData and push all specifics into new Arrays
          for (var i = 0; i < self.fishData.length; i++) {
            self.gearArray.push(self.fishData[i].gear);
          }
          for (var i = 0; i < self.fishData.length; i++) {
            self.lakeArray.push(self.fishData[i].location);
          }
          for (var i = 0; i < self.fishData.length; i++) {
            self.breedArray.push(self.fishData[i].species);
          }
          for (var i = 0; i < self.fishData.length; i++) {
            self.weightArray.push(self.fishData[i].weight)
          }
          for (var i = 0; i < self.fishData.length; i++) {
            self.fishLengthArray.push(self.fishData[i].fishLength)
          }

          //call our mode function that returns most used strings
          self.mostUsedGear = mode(self.gearArray);
          self.mostUsedLake = mode(self.lakeArray);
          self.mostCaughtBreed = mode(self.breedArray);

          //get the average weight
          var weightSum = 0.0000;
          for (var i = 0; i < self.weightArray.length; i++) {
            weightSum += self.weightArray[i];
          }

          self.averageWeight = weightSum/self.weightArray.length;
          self.averageWeight = self.averageWeight.toString();
          self.averageWeight = self.averageWeight.slice(0, (self.averageWeight.indexOf("."))+3);
          Number(self.averageWeight);

          //get the average length
          var lengthSum = 0.0000;
          for (var i = 0; i < self.fishLengthArray.length; i++) {
            lengthSum += self.fishLengthArray[i];
          }

          self.averageLength = lengthSum/self.fishLengthArray.length;
          self.averageLength = self.averageLength.toString();
          self.averageLength = self.averageLength.slice(0, (self.averageLength.indexOf("."))+3);
          Number(self.averageLength);

          // var allBass = self.fishData.filter(function (fish){
          //   return self.fishData.breed === "bass";
          //
          // });
          // console.log(allBass);
          // return self.fishData;

        });
      }).catch(function(error) {
        console.log("Authentication failed: ", error);
      });
    } else {
      console.log("Log in to get some data");
    }
  }

  //deleting fish
  self.deleteFish = function(thisFish){
    FishDataFactory.deleteFishies(thisFish).then(function(response){
      getFishies();
    });
  }

  //function to sort arrays by most used
  function mode(arr){
    var sortedArray = arr.sort((a,b) =>
    arr.filter(v => v==a).length
    - arr.filter(v => v==b).length
  );
  return sortedArray.pop();
}

//


}]);
