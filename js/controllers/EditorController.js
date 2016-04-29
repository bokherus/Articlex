app.controller('EditorController', ['$scope',
function($scope) {
  $scope.show = function() {
    console.log("Clicked");
    alert($scope.content);
  };

  $scope.content = "abc";

  $scope.tinymceOptions = {
    onChange: function(e) {
      // put logic here for keypress and cut/paste changes
    },
    inline: false,
    plugins : 'advlist autolink link image lists charmap print preview',
    skin: 'lightgray',
    theme : 'modern'
  };

  $scope.$on('$routeChangeSuccess',function() {
     console.log("Scrolled to the top of the article");
     window.scrollTo(0, 0);
  });
}]);
