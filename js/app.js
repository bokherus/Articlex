var app = angular.module("myApp", ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: 'views/home.html'
    })
    .when('/articles/:id', {
    	controller: 'ArticleController',
    	templateUrl: 'views/article.html'
  	})
    .otherwise({
      redirectTo: '/'
    });
});

$(document).ready(function() {
  NProgress.start();
});
