var app = angular.module("fishApp", ['firebase', "ngRoute"]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/fishdata', {
    templateUrl: '/views/templates/fishdata.html',
    controller: 'mainCtrl',
    controllerAs: 'mc'
  })
  .when('/addFish', {
    templateUrl: '/views/templates/addFish.html',
    controller: 'addCtrl',
    controllerAs: 'ac'
  })
  .otherwise({
    redirectTo: 'fishdata'
  });
}]); //close app.config

app.controller("mainCtrl", function($firebaseAuth, $http) {

  var auth = $firebaseAuth();
  var self = this;

  // This code runs whenever the user logs in
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  // This code runs whenever the user changes authentication states
  // e.g. whevenever the user logs in or logs out
  // this is where we put most of our logic so that we don't duplicate
  // the same things in the login and the logout code
  auth.$onAuthStateChanged(function(firebaseUser){
    // firebaseUser will be null if not logged in
    self.currentUser = firebaseUser;
    if(firebaseUser) {
      // This is where we make our call to our server
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/fishData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.fishData = response.data;
        });
      });
    } else {
      console.log('Not logged in or not authorized.');
      self.fishData = [];
    }

  });

  // This code runs when the user logs out
  self.logOut = function(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
    });
  };
});
