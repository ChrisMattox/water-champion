app.factory('FishDataFactory', ["$http", function($http) {

  var fishData = undefined;
  var idToken = undefined;

  //get the data
  function getFishData(){
    var promise = $http({
      method: 'GET',
      url: '/fishData',
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      //information back from server side
      fishData = response.data;
      return fishData;
    });
    return promise;
  }

  function postFish(newFish){
    var promise = $http.post('/fishData', newFish)
    .then(function(response){
      console.log("Fish Factory Add a Fish res", response);
      return getFishData();
    },
    function(response){
      console.log("ERROR post response: ", response.data);
    });
    return promise;
  }

  var fishApi = {
    fishData: function(){
      //return our fish data stored here to the controller
      return fishData;
    },
    setIdToken: function(newIdToken){
      idToken = newIdToken;
      return;
    },
    updateFish: function(){
      return getFishData();
    },
    addNewFish: function(newFish) {
      return postFish(newFish);
    }
  };

  return fishApi;

}]);
