app.controller('ArticleController', ['$scope', 'articles', '$routeParams',
  function($scope, articles, $routeParams) {
    articles.success(function(data) {
    $scope.detail = data[$routeParams.id];
    $scope.content = $scope.detail.content;
    $scope.img = 'http://fashatude.com/static/fashatude/img/user_icon.png';
    if ($scope.detail.img !== undefined) {
      $scope.img = $scope.detail.img;
    }
    console.log($scope.img);
  });

  $scope.$on('$routeChangeSuccess',function() {
     console.log("Scrolled to the top of the article");
     window.scrollTo(0, 0);
  });


}]);
