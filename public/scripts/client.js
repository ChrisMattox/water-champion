var app = angular.module("waterChampionApp", ["firebase", "ngRoute"]);

//setting up routes for angular controllers. stretch goal is to have only this
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/fishdata', {
    templateUrl: '/views/templates/fishdata.html',
    controller: 'topFishCtrl',
    controllerAs: 'tfc'
  })
  .when('/addFish', {
    templateUrl: '/views/templates/addfish.html',
    controller: 'addCtrl',
    controllerAs: 'ac'
  })
  .otherwise({
    redirectTo: 'fishdata'
  });
}]); //close app.config

//main contoller, controls login/out of app, more functionality tbd
app.controller("topFishCtrl", function($firebaseAuth, $http) {

//set empty variables needed here

  var auth = $firebaseAuth();
  var self = this;
  self.currentUser = {};
  self.fishData = {};


// Executed login code. Calls to the server to get users fish data
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      // get fish data
      if(firebaseUser) {
        console.log("Firebase User", firebaseUser);
        // This is where we make our call to our server
        firebaseUser.getToken().then(function(idToken){
          $http({
            method: 'GET',
            url: '/fishData',
            headers: {
              id_token: idToken
            }
          }).then(function(response){
            //information back from server side
            self.fishData = response.data;
            console.log("here fishy fishy", self.fishData);
          });
        });
      } else {
        console.log('Not logged in or not authorized.');
      }
  }).catch(function(error) {
    console.log("Authentication failed: ", error);
  });
};

// This code runs whenever the user changes authentication states, or whenever the hell it wants in my case
auth.$onAuthStateChanged(function(user) {
  // if (user) {
  //   user.getToken().then(function(data) {
  //     console.log(data)
  //   });
  // }
});

// This code runs when the user logs out
self.logOut = function(){
  auth.$signOut().then(function(){
    console.log('Logging the user out!');
  });
};
});
