app.controller('LoginController', [
  '$scope',
  'userinfo',
  function($scope, userinfo){

    $scope.login = function(){
      var username = $scope.username;
      var password = $scope.password;
      userinfo.postLogin(username, password, function(response){
          console.log(response);
          
      });
    };

  }
]);
