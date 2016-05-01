app.factory('userinfo', function($http, $location){

  var currentUsername = '';

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
      $location.path("/");
    }).then(function(response){
      console.log(response);
    });

  }

  function getUsername(){
    return currentUsername;
  }

  return {
    postLogin: postLogin,
    getUsername: getUsername
  };
});
