//top fish contoller, controls login/out of app, displaying initial fish
app.controller("TopFishCtrl", ["$firebaseAuth", "$http", "FishDataFactory", "AuthDataFactory", function($firebaseAuth, $http, DataFactory, AuthDataFactory) {

  //set empty variables needed here
  var auth = $firebaseAuth();
  var self = this;
  self.currentUser = null;
  self.fishData = {};
  getFishies();

  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser){
      console.log("Firebase authenticaed in controller as ", firebaseUser.user.displayName);
      self.currentUser = firebaseUser.user;
      getFishies();
    });
  };

  // This code runs whenever the user changes authentication states, or whenever the hell it wants in my case
  auth.$onAuthStateChanged(function(user) {
    if (user) {
      user.getToken().then(function(data) {
      });
    }
  });

  // This code runs when the user logs out
  self.logOut = function(){
    auth.$signOut().then(function(){
      self.currentUser = {};
      self.fishData = {};
      console.log('Logging the user out!');
    });
  };


function getFishies(){
  if(self.currentUser) {
    console.log("Firebase User", self.currentUser);
    self.currentUser.getToken().then(function(idToken){
      DataFactory.setIdToken(idToken);
      if(DataFactory.fishData() == undefined) {
        DataFactory.updateFish().then(function(response) {
          self.fishData = DataFactory.fishData();
          return self.fishData;
          console.log("Fish data from factory", self.fishData);
        });
      } else {
        console.log('Not logged in or not authorized.');
        self.fishData = DataFactory.fishData();
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
