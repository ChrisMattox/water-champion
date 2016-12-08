app.factory('AuthDataFactory', ["$http", function($http) {

  var currentUser = null;



  var authApi = {
    setCurrentUser: function(theUser){
      currentUser = theUser;
      return;
    },
    getCurrentUser: function(){
      return currentUser;
    }
  }

  return authApi;

}]);
