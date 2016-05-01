app.controller('ArticleController', ['$scope', 'articles', '$routeParams', '$http', 'userinfo',
  function($scope, articles, $routeParams, $http, userinfo) {
    articles.success(function(data) {
    $scope.detail = data[$routeParams.id];
    $scope.content = $scope.detail.content;
    $scope.userImage = "https://image.freepik.com/free-icon/user-male-shape-in-a-circle--ios-7-interface-symbol_318-39025.png";
    if ($scope.detail.img !== undefined) {
      $scope.img = $scope.detail.img;
    }
    console.log($scope.img);
    getComment();
    $scope.url = 'http://chinnnoo.xyz:8889/api/comment/aid/' + $scope.detail.articleId + '/commentorId/1000000005';
  });

  $scope.formData = {};


  $scope.submitComment = function() {
    console.log($scope.url);
  $http({
    method  : 'POST',
    url     : $scope.url,
    data    : $.param($scope.formData),
    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
   })
    .success(function(data) {
      console.log("sent");
      
      $scope.$apply(function() {
          $scope.comments.push(data);
      });
    });
  };

  var getComment = function () {
    $http.get('http://chinnnoo.xyz:8889/api/comment/aid/' + $scope.detail.articleId)
           .success(function(data) {
             $scope.comments = data;
             return data;
           })
           .error(function(data) {
             console.log("Failed a");
             return data;
           });

    console.log($scope.comments);
  }


  $scope.$on('$routeChangeSuccess',function() {
     console.log("Scrolled to the top of the article");
     window.scrollTo(0, 0);
  });


}]);
