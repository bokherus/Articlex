var app = angular.module("myApp", ['ngRoute', 'ngSanitize', 'ui.tinymce', 'relativeDate']);

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
    .when('/new', {
      controller: 'EditorController',
      templateUrl: 'views/new.html'
    })
    .when('/register', {
      controller: 'MainController',
      templateUrl: 'views/register.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

$(document).ready(function() {
  NProgress.start();
});

var header = document.querySelector("#header");

if (window.location.hash) {
  header.classList.add("headroom--unpinned");
}

var headroom = new Headroom(header, {
    tolerance: {
      down : 10,
      up : 20
    },
    offset : 205
});
headroom.init();
