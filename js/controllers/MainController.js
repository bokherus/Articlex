app.controller('MainController',[
  '$scope',
  '$http',
  'articles',
  'userinfo',
  function($scope, $http, articles, userinfo) {

  articles.success(function(data) {
    $scope.articles = data;
    $scope.userImage = "https://image.freepik.com/free-icon/user-male-shape-in-a-circle--ios-7-interface-symbol_318-39025.png";

    console.log(userinfo.getInfo());

    for (var i in $scope.articles) {
      $scope.articles[i].class = "fa fa-heart-o fa-lg";
      getLove($scope.articles[i].articleId, i);
    }

  });

  $scope.love = function(index) {
   if ($scope.articles[index].class === "fa fa-heart-o fa-lg") {
     $scope.articles[index].class = "fa fa-heart fa-lg";
     $scope.articles[index].loveCount++;
     postLove($scope.articles[index].articleId, index);
   }
   else {
      $scope.articles[index].class = "fa fa-heart-o fa-lg";
      $scope.articles[index].loveCount--;
      deleteLove($scope.articles[index].articleId, index);
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

  var postLove = function(articleId, i) {
    $http({
      method  : 'POST',
      url     : 'http://chinnnoo.xyz:8889/api/loves/aid/' + articleId + '/uid/' + userinfo.getInfo().uid,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data) {
      console.log("postedLove!");
    });
  };

  var deleteLove = function(articleId, i) {
    $http({
      method  : 'DELETE',
      url     : 'http://chinnnoo.xyz:8889/api/loves/aid/' + articleId + '/uid/' + userinfo.getInfo().uid,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data) {
      console.log("DeletedLove");
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
