app.controller('ArticleController', ['$scope', 'articles', '$routeParams',
  function($scope, articles, $routeParams) {
    articles.success(function(data) {
    $scope.detail = data[$routeParams.id];
  });

  $scope.$on('$routeChangeSuccess',function() {
     console.log("Scrolled to the top of the article");
     window.scrollTo(0, 0);
  });
}]);
