app.controller('ArticleController', ['$scope', 'articles', '$routeParams',
  function($scope, articles, $routeParams) {
    articles.success(function(data) {
    $scope.detail = data[$routeParams.id];
    $scope.content = $scope.detail.content;
    $scope.userImage = "https://image.freepik.com/free-icon/user-male-shape-in-a-circle--ios-7-interface-symbol_318-39025.png";
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
