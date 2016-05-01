app.factory('userinfo', function($http){

  var currentUsername = '';

  function postLogin(username, password, callback){
    var data = $.param({
      json: JSON.stringify({
        username: username,
        password: password
      })
    });
    currentUsername = username;
    console.log('postLogin');
    $http({
      method: 'POST',
      url: 'chinnnoo.xyz:8889/signin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: { username: username, password: password }
    }).then(function(response){
      console.log(response+'2');
    }).then(function(response){
      console.log(response+'1');
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
