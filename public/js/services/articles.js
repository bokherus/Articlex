app.factory('articles', ['$http', function($http) {
  return $http.get('http://chinnnoo.xyz:8889/api/article/latest')
         .success(function(data) {
           console.log("Success");
           return data;
         })
         .error(function(data) {
           console.log("Failed");
           return data;
         });
}]);

// https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json
