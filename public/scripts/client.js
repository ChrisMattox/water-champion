var app = angular.module("waterChampionApp", ["firebase", "ngRoute"]);

//setting up routes for angular controllers. stretch goal is to have only this
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/topfish', {
    templateUrl: '/views/templates/topfish.html',
    controller: 'topFishCtrl',
    controllerAs: 'tfc'
  })
  .when('/addfish', {
    templateUrl: '/views/templates/addfish.html',
    controller: 'addFishCtrl',
    controllerAs: 'afc'
  })
  .when('/viewfish', {
    templateUrl: '/views/templates/viewfish.html',
    controller: 'viewFishCtrl',
    controllerAs: 'vfc'
  })
  .otherwise({
    redirectTo: 'topfish'
  });
}]); //close app.config

//top fish contoller, controls login/out of app, displaying initial fish
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
      //set the current user as the returned firebaseUser
      self.currentUser = firebaseUser.user;
      // get fish data
      if(self.currentUser) {
        console.log("Firebase User", self.currentUser);
        // This is where we make our call to our server
        self.currentUser.getToken().then(function(idToken){
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

function getFishData(){
  $http.get('/fishData')
  .then(function(response){
    self.fishData = response.data;
  });
}

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
    console.log('Logging the user out!');
  });
};
});


app.controller("addFishCtrl", ["$http", function($firebaseAuth, $http) {
    var self = this;

}]);

app.controller("viewFishCtrl", ["$http", function($firebaseAuth, $http) {
    var self = this;

}]);
