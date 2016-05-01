app.factory('userinfo', function($http, $location){

  var currentUsername = '';
  var info = {};

  function postLogin(username, password, callback){
    currentUsername = username;
    console.log('postLogin');
    $http({
      method: 'POST',
      url: 'http://localhost:8889/signin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: $.param({username: username, password: password})
    }).then(function(response){
      retrieveInfo();
      $location.path("/");
    }).then(function(response){
      console.log(response);
    });

  }

  function retrieveInfo(){
    $http({
      method: 'GET',
      url: 'http://localhost:8889/api/userinfo/username/' + currentUsername,
    }).then(function(response){
      console.log(response);
      info = response.data;
    }).then(function(response){
      console.log(response);
    });
  }

  function getInfo(){
    return info;
  }

  return {
    postLogin: postLogin,
    getInfo: getInfo
  };
});
