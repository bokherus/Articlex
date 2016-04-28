app.controller('EditorController', ['$scope',
function($scope) {
  $scope.$on('$routeChangeSuccess',function() {
     console.log("Scrolled to the top of the article");
     window.scrollTo(0, 0);
  });
}]);
