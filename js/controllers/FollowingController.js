app.controller('FollowingController',[
  '$scope',
  '$http',
  'userinfo',
  function($scope, $http, userinfo) {

  $http.get('http://chinnnoo.xyz:8889/api/article/following/' + userinfo.getInfo().uid)
           .success(function(data) {
             console.log("data");
             $scope.articles = data;
             $scope.userImage = "https://image.freepik.com/free-icon/user-male-shape-in-a-circle--ios-7-interface-symbol_318-39025.png";
             for (var i in $scope.articles) {
               $scope.articles[i].class = "fa fa-heart-o fa-lg";
               getLove($scope.articles[i].articleId, i);
             }
             return data;
           })
           .error(function(data) {
             console.log("Failed");
             return data;
           });

  $scope.love = function(index) {
   if ($scope.articles[index].class === "fa fa-heart-o fa-lg") {
     $scope.articles[index].class = "fa fa-heart fa-lg";
     $scope.articles[index].loveCount++;
   }
   else {
      $scope.articles[index].class = "fa fa-heart-o fa-lg";
      $scope.articles[index].loveCount--;
   }
  };

  var getLove = function(articleId , i) {
    $http.get('http://chinnnoo.xyz:8889/api/loves/article/' + articleId)
           .success(function(data) {
             $scope.articles[i].love = data;
             $scope.articles[i].loveCount = data.length;
             return data;
           })
           .error(function(data) {
             return data;
           });

  };

  $scope.getTruncatedContent = function(data) {
    data = data.content;
    var wanted_count = 100;
    var cutstrObj = new CutString(data, wanted_count);
    return cutstrObj.cut();
  };

  $scope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
    NProgress.done();
  });

}]);
