var app = angular.module("myApp", ['ngRoute', 'ngMaterial']);

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

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('amber')
    .accentPalette('orange');
});

app.controller('BasicDemoCtrl', function DemoCtrl($mdDialog) {
    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    this.notificationsEnabled = true;
    this.toggleNotifications = function() {
      this.notificationsEnabled = !this.notificationsEnabled;
    };
    this.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
      );
      originatorEv = null;
    };
    this.checkVoicemail = function() {
      // This never happens.
    };
});

$(document).ready(function() {
  NProgress.start();
});
