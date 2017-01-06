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
  self.bassArray = [];
  self.bassWeightArray = [];
  self.bassGearArray = [];
  self.bassLakeArray = [];
  self.walleyeArray = [];
  self.walleyeWeightArray = [];
  self.walleyeGearArray = [];
  self.walleyeLakeArray = [];
  self.muskieArray = [];
  self.muskieWeightArray = [];
  self.muskieGearArray = [];
  self.muskieLakeArray = [];
  self.pikeArray = [];
  self.pikeWeightArray = [];
  self.pikeGearArray = [];
  self.pikeLakeArray = [];
  self.crappieArray = [];
  self.crappieWeightArray = [];
  self.crappieGearArray = [];
  self.crappieLakeArray = [];
  self.perchArray = [];
  self.perchWeightArray = [];
  self.perchGearArray = [];
  self.perchLakeArray = [];
  self.rockBassArray = [];
  self.rockBassWeightArray = [];
  self.rockBassGearArray = [];
  self.rockBassLakeArray = [];

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

          //avg bass stuffs
          self.allBass = self.fishData.filter(function (fish){
            return fish.species === "Bass";
          });

          for (var i = 0; i < self.allBass.length; i++) {
            self.bassArray.push(self.allBass[i].fishLength);
            self.bassWeightArray.push(self.allBass[i].weight);
            self.bassGearArray.push(self.allBass[i].gear);
            self.bassLakeArray.push(self.allBass[i].location);
          }

          self.mostUsedBassGear = mode(self.bassGearArray);
          self.topBassLake = mode(self.bassLakeArray);


          var bassLengthSum = 0.0000;
          for (var i = 0; i < self.bassArray.length; i++) {
            bassLengthSum += self.bassArray[i];
          }

          self.averageBassLength = bassLengthSum/self.bassArray.length;
          self.averageBassLength = self.averageBassLength.toString();
          self.averageBassLength = self.averageBassLength.slice(0, (self.averageBassLength.indexOf("."))+3);
          Number(self.averageBassLength);
          if (self.averageBassLength === "Na")
          self.averageBassLength = 0;

          var bassWeightSum = 0.0000;
          for (var i = 0; i < self.bassWeightArray.length; i++) {
            bassWeightSum += self.bassWeightArray[i];
          }

          self.averageBassWeight = bassWeightSum/self.bassWeightArray.length;
          self.averageBassWeight = self.averageBassWeight.toString();
          self.averageBassWeight = self.averageBassWeight.slice(0, (self.averageBassWeight.indexOf("."))+3);
          Number(self.averageBassWeight);

          //end bass stuffs

          //all walleye stuffs
          self.allWalleye = self.fishData.filter(function (fish){
            return fish.species === "Walleye";
          });

          for (var i = 0; i < self.allWalleye.length; i++) {
            self.walleyeArray.push(self.allWalleye[i].fishLength);
            self.walleyeWeightArray.push(self.allWalleye[i].weight);
            self.walleyeGearArray.push(self.allWalleye[i].gear);
            self.walleyeLakeArray.push(self.allWalleye[i].location);
          }

          self.mostUsedWalleyeGear = mode(self.walleyeGearArray);
          self.topWalleyeLake = mode(self.walleyeLakeArray);

          var walleyeLengthSum = 0.0000;
          for (var i = 0; i < self.walleyeArray.length; i++) {
            walleyeLengthSum += self.walleyeArray[i];
          }

          self.averageWalleyeLength = walleyeLengthSum/self.walleyeArray.length;
          self.averageWalleyeLength = self.averageWalleyeLength.toString();
          self.averageWalleyeLength = self.averageWalleyeLength.slice(0, (self.averageWalleyeLength.indexOf("."))+3);
          Number(self.averageWalleyeLength);
          if (self.averageWalleyeLength === "Na")
          self.averageBassLength = 0;

          var walleyeWeightSum = 0.0000;
          for (var i = 0; i < self.walleyeWeightArray.length; i++) {
            walleyeWeightSum += self.walleyeWeightArray[i];
          }

          self.averageWalleyeWeight = walleyeWeightSum/self.walleyeWeightArray.length;
          self.averageWalleyeWeight = self.averageWalleyeWeight.toString();
          self.averageWalleyeWeight = self.averageWalleyeWeight.slice(0, (self.averageWalleyeWeight.indexOf("."))+3);
          Number(self.averageWalleyeWeight);
          //end walleye stuffs

          //all muskie stuffs
          self.allMuskie = self.fishData.filter(function (fish){
            return fish.species === "Muskie";
          });

          for (var i = 0; i < self.allMuskie.length; i++) {
            self.muskieArray.push(self.allMuskie[i].fishLength);
            self.muskieWeightArray.push(self.allMuskie[i].weight);
            self.muskieGearArray.push(self.allMuskie[i].gear);
            self.muskieLakeArray.push(self.allMuskie[i].location);
          }

          self.mostUsedMuskieGear = mode(self.muskieGearArray);
          self.topMuskieLake = mode(self.walleyeLakeArray);

          var muskieLengthSum = 0.0000;
          for (var i = 0; i < self.muskieArray.length; i++) {
            muskieLengthSum += self.muskieArray[i];
          }

          self.averageMuskieLength = muskieLengthSum/self.muskieArray.length;
          self.averageMuskieLength = self.averageMuskieLength.toString();
          self.averageMuskieLength = self.averageMuskieLength.slice(0, (self.averageMuskieLength.indexOf("."))+3);
          Number(self.averageMuskieLength);
          if (self.averageMuskieLength === "Na")
          self.averageMuskieLength = 0;

          var muskieWeightSum = 0.0000;
          for (var i = 0; i < self.muskieWeightArray.length; i++) {
            muskieWeightSum += self.muskieWeightArray[i];
          }

          self.averageMuskieWeight = muskieWeightSum/self.muskieWeightArray.length;
          self.averageMuskieWeight = self.averageMuskieWeight.toString();
          self.averageMuskieWeight = self.averageMuskieWeight.slice(0, (self.averageMuskieWeight.indexOf("."))+3);
          Number(self.averageMuskieWeight);
          //end muskie stuffs

          //all pike stuffs
          self.allPike = self.fishData.filter(function (fish){
            return fish.species === "Pike";
          });

          for (var i = 0; i < self.allPike.length; i++) {
            self.pikeArray.push(self.allPike[i].fishLength);
            self.pikeWeightArray.push(self.allPike[i].weight);
            self.pikeGearArray.push(self.allPike[i].gear);
            self.pikeLakeArray.push(self.allPike[i].location);
          }

          self.mostUsedPikeGear = mode(self.pikeGearArray);
          self.topPikeLake = mode(self.pikeLakeArray);


          var pikeLengthSum = 0.0000;
          for (var i = 0; i < self.pikeArray.length; i++) {
            pikeLengthSum += self.pikeArray[i];
          }

          self.averagePikeLength = pikeLengthSum/self.pikeArray.length;
          self.averagePikeLength = self.averagePikeLength.toString();
          self.averagePikeLength = self.averagePikeLength.slice(0, (self.averagePikeLength.indexOf("."))+3);
          Number(self.averagePikeLength);
          if (self.averagePikeLength === "Na")
          self.averagePikeLength = 0;

          var pikeWeightSum = 0.0000;
          for (var i = 0; i < self.pikeWeightArray.length; i++) {
            pikeWeightSum += self.pikeWeightArray[i];
          }

          self.averagePikeWeight = pikeWeightSum/self.pikeWeightArray.length;
          self.averagePikeWeight = self.averagePikeWeight.toString();
          self.averagePikeWeight = self.averagePikeWeight.slice(0, (self.averagePikeWeight.indexOf("."))+3);
          Number(self.averagePikeWeight);
          if (self.averagePikeWeight === "Na")
          self.averagePikeWeight = 0;
          //end pike stuffs

          //all crappie stuffs
          self.allCrappie = self.fishData.filter(function (fish){
            return fish.species === "Crappie";
          });

          for (var i = 0; i < self.allCrappie.length; i++) {
            self.crappieArray.push(self.allCrappie[i].fishLength);
            self.crappieWeightArray.push(self.allCrappie[i].weight);
            self.crappieGearArray.push(self.allCrappie[i].gear);
            self.crappieLakeArray.push(self.allCrappie[i].location);
          }

          self.mostUsedCrappieGear = mode(self.crappieGearArray);
          self.topCrappieLake = mode(self.crappieLakeArray);

          var crappieLengthSum = 0.0000;
          for (var i = 0; i < self.crappieArray.length; i++) {
            crappieLengthSum += self.crappieArray[i];
          }

          self.averageCrappieLength = crappieLengthSum/self.crappieArray.length;
          self.averageCrappieLength = self.averageCrappieLength.toString();
          self.averageCrappieLength = self.averageCrappieLength.slice(0, (self.averageCrappieLength.indexOf("."))+3);
          Number(self.averageCrappieLength);
          if (self.averageCrappieLength === "Na")
          self.averageCrappieLength = 0;

          var crappieWeightSum = 0.0000;
          for (var i = 0; i < self.crappieWeightArray.length; i++) {
            crappieWeightSum += self.crappieWeightArray[i];
          }

          self.averageCrappieWeight = crappieWeightSum/self.crappieWeightArray.length;
          self.averageCrappieWeight = self.averageCrappieWeight.toString();
          self.averageCrappieWeight = self.averageCrappieWeight.slice(0, (self.averageCrappieWeight.indexOf("."))+3);
          Number(self.averageCrappieWeight);
          if (self.averageCrappieWeight === "Na")
          self.averageCrappieWeight = 0;
          //end crappie stuffs

          //all perch stuffs
          self.allPerch = self.fishData.filter(function (fish){
            return fish.species === "Perch";
          });

          for (var i = 0; i < self.allPerch.length; i++) {
            self.perchArray.push(self.allPerch[i].fishLength);
            self.perchWeightArray.push(self.allPerch[i].weight);
            self.perchGearArray.push(self.allPerch[i].gear);
            self.perchLakeArray.push(self.allPerch[i].location);
          }

          self.mostUsedPerchGear = mode(self.perchGearArray);
          self.topPerchLake = mode(self.perchLakeArray);

          var perchLengthSum = 0.0000;
          for (var i = 0; i < self.perchArray.length; i++) {
            perchLengthSum += self.perchArray[i];
          }

          self.averagePerchLength = perchLengthSum/self.perchArray.length;
          self.averagePerchLength = self.averagePerchLength.toString();
          self.averagePerchLength = self.averagePerchLength.slice(0, (self.averagePerchLength.indexOf("."))+3);
          Number(self.averagePerchLength);
          if (self.averagePerchLength === "Na")
          self.averagePerchLength = 0;

          var perchWeightSum = 0.0000;
          for (var i = 0; i < self.perchWeightArray.length; i++) {
            perchWeightSum += self.perchWeightArray[i];
          }

          self.averagePerchWeight = perchWeightSum/self.perchWeightArray.length;
          self.averagePerchWeight = self.averagePerchWeight.toString();
          self.averagePerchWeight = self.averagePerchWeight.slice(0, (self.averagePerchWeight.indexOf("."))+3);
          Number(self.averagePerchWeight);
          if (self.averagePerchWeight === "Na")
          self.averagePerchWeight = 0;
          //end crappie stuffs

          //all rock bass stuffs
          self.allRockBass = [];
          self.allRockBass = self.fishData.filter(function (fish){
            return fish.species === "RockBass";
          });

          for (var i = 0; i < self.allRockBass.length; i++) {
            self.rockBassArray.push(self.allRockBass[i].fishLength);
            self.rockBassWeightArray.push(self.allRockBass[i].weight);
            self.rockBassGearArray.push(self.allRockBass[i].gear);
            self.rockBassLakeArray.push(self.allRockBass[i].location);
          }

          self.mostUsedRockBassGear = mode(self.rockBassGearArray);
          self.topRockBassLake = mode(self.rockBassLakeArray);

          var rockBassLengthSum = 0.0000;
          for (var i = 0; i < self.rockBassArray.length; i++) {
            rockBassLengthSum += self.rockBassArray[i];
          }

          self.averageRockBassLength = 0;
          self.averageRockBassLength = rockBassLengthSum/self.rockBassArray.length;
          self.averageRockBassLength = self.averageRockBassLength.toString();
          self.averageRockBassLength = self.averageRockBassLength.slice(0, (self.averageRockBassLength.indexOf("."))+3);
          Number(self.averageRockBassLength);
          if (self.averageRockBassLength === "Na")
          self.averageRockBassLength = 0;

          var rockBassWeightSum = 0.0000;
          for (var i = 0; i < self.rockBassWeightArray.length; i++) {
            rockBassWeightSum += self.rockBassWeightArray[i];
          }

          self.averageRockBassWeight = rockBassWeightSum/self.rockBassWeightArray.length;
          self.averageRockBassWeight = self.averageRockBassWeight.toString();
          self.averageRockBassWeight = self.averageRockBassWeight.slice(0, (self.averageRockBassWeight.indexOf("."))+3);
          Number(self.averageRockBassWeight);
          if (self.averageRockBassWeight === "Na")
          self.averageRockBassWeight = 0;
          //end rock bass stuffs

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

}]);
