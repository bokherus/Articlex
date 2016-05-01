app.controller('MainController',[
  '$scope',
  '$http',
  'articles',
  'userinfo',
  function($scope, $http, articles, userinfo) {

  articles.success(function(data) {
    $scope.class = "fa fa-heart-o fa-lg";
    $scope.articles = data;
    for (var i in $scope.articles) {
      $scope.articles[i].class = "fa fa-heart-o fa-lg";
      getLove($scope.articles[i].articleId, i);
    }
    $scope.userImage = "https://image.freepik.com/free-icon/user-male-shape-in-a-circle--ios-7-interface-symbol_318-39025.png";
    $scope.loveCount = 50;
    console.log(userinfo.getInfo());

  });

  $scope.love = function(index) {
   if ($scope.articles[index].class === "fa fa-heart-o fa-lg"){
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
             console.log(data);
             $scope.articles[i].loveCount = data.length;
             return data;
           })
           .error(function(data) {
             console.log("Failed azzz");
             return data;
           });

    console.log($scope.comments);
  }

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
