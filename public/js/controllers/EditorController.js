app.controller('EditorController', ['$scope',
function($scope) {
  $scope.show = function() {
    console.log($scope.content);
  };

  $scope.content = "Type your story here";

  $scope.tinymceOptions = {
    onChange: function(e) {
      // put logic here for keypress and cut/paste changes
    },
    inline: true,
    menubar: false,
    toolbar: 'styleselect | undo redo | bold italic | link image',
    plugins : 'advlist autolink link image lists charmap',
    skin: 'lightgray',
    theme : 'modern'
  };

  $scope.$on('$routeChangeSuccess',function() {
     console.log("Scrolled to the top of the article");
     window.scrollTo(0, 0);
  });
}]);
