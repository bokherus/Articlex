app.controller('ArticleController', ['$scope', 'articles', '$routeParams',
  function($scope, articles, $routeParams) {
    articles.success(function(data) {
    $scope.detail = data[$routeParams.id];
  });
}]);
