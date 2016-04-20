app.controller('MainController', ['$scope', 'articles',
function($scope, articles) {
  articles.success(function(data) {
    $scope.articles = data;
    console.log("Data in controller\n" + data);
  });

  $scope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
    NProgress.done();
  });

}]);
