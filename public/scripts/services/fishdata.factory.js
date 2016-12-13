app.factory('FishDataFactory', ["$http", function($http) {

  var fishData = undefined;
  var idToken = undefined;
  var picData = [];

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
    var promise = $http({
      method: 'POST',
      url: '/fishData',
      data: newFish,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      console.log("Fish Factory Add a Fish res", response);
      return getFishData();
    },
    function(response){
      console.log("ERROR post response: ", response.data);
    });
    return promise;
  }

  function removeFish(thisFish){
    console.log("fish in da factory to delete", thisFish);
    var promise = $http({
      method: 'DELETE',
      url: '/fishData/' + thisFish._id,
      data: thisFish,
      headers: {
        id_token: idToken
      }
    }).then(function(response){
      getFishData();

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
    },
    deleteFishies: function(thisFish) {
      return removeFish(thisFish);
    },
    picData: function(){
      return picData;
    },
    setPicData: function(newPicData){
      picData.push(newPicData);
      return;
    }
  };

  return fishApi;

}]);
