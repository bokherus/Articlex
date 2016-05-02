app.controller('ArticleController', ['$scope', 'articles', '$routeParams', '$http', 'userinfo', '$location',
  function($scope, articles, $routeParams, $http, userinfo, $location) {
    articles.success(function(data) {
    $scope.detail = data[$routeParams.id];
    $scope.class = 'follow-button';
    $scope.followButton = "Follow";

    $scope.content = $scope.detail.content;
    $scope.userImage = "https://image.freepik.com/free-icon/user-male-shape-in-a-circle--ios-7-interface-symbol_318-39025.png";
    if ($scope.detail.img !== undefined) {
      $scope.img = $scope.detail.img;
    }
    console.log($scope.img);
    getComment();
    $scope.postCommentUrl = 'http://chinnnoo.xyz:8889/api/comment/aid/' + $scope.detail.articleId + '/commentorId/' + userinfo.getInfo().uid;
    $scope.postFollowUrl = 'http://chinnnoo.xyz:8889/api/follow/' + userinfo.getInfo().uid +'/following/' + $scope.detail.authorId;
  });

  $scope.formData = {};

  $scope.follow = function() {
    if ($scope.class === "follow-button") {
          $scope.class = "following-button";
          $scope.followButton = "Following";
          submitFollow();
    }
    else {
        $scope.class = "follow-button";
        $scope.followButton = "Follow";
    }
  };

  var submitFollow = function() {
    $http({
      method  : 'POST',
      url     : $scope.postFollowUrl,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
     })
      .success(function(data) {
        console.log("sent follow");
      });
  };


  $scope.submitComment = function() {
    console.log($scope.url);
  $http({
    method  : 'POST',
    url     : $scope.postCommentUrl,
    data    : $.param($scope.formData),
    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
   })
    .success(function(data) {
      console.log("sent");

      $scope.$apply(function() {
          $scope.comments.push(data);
          getComment();
          $location.url("http://chinnnoo.xyz/articles/" + $routeParams.id);
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
  };


  $scope.$on('$routeChangeSuccess',function() {
     console.log("Scrolled to the top of the article");
     window.scrollTo(0, 0);
  });


}]);
