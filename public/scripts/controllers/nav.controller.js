//top fish contoller, controls login/out of app, displaying initial fish
var app = angular.module("navApp", ["firebase", "ngRoute"]);

app.controller("NavCtrl", ["$firebaseAuth", "$http", "FishDataFactory", "AuthDataFactory", function($firebaseAuth, $http, FishDataFactory, AuthDataFactory) {

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
      AuthDataFactory.setCurrentUser(self.currentUser);
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
      AuthDataFactory.setCurrentUser(null);
      self.currentUser = null;
      self.fishData = {};
      FishDataFactory.fishData() = null;
      console.log('Logging the user out!', self.currentUser);
    });
  };


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