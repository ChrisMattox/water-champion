app.factory('AuthDataFactory', ["$http", function($http) {

  var currentUser = undefined;

  var publicApi = {
    theCurrentUser: function(){
      return currentUser;
    }
  }

  return publicApi;

}]);
