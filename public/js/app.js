var app = angular.module('authApp', ['ui.router', 'satellizer'])
.config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider, $httpProvider) {

  $locationProvider.html5Mode(true).hashPrefix('!');
  // Satellizer configuration that specifies which API
  // route the JWT should be retrieved from
  $authProvider.loginUrl = '/oauth/token';

  // Redirect to the auth state if any other states
  // are requested other than users
  $urlRouterProvider.otherwise('/home');

  $httpProvider.interceptors.push('authInterceptor');

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'views/loginView.html',
    controller: 'LoginController as login',
    authenticate: false
  })
  .state('register', {
    url: '/register',
    templateUrl: 'views/registerView.html',
    controller: 'RegisterController as register',
    authenticate: false
  })
  .state('success', {
    templateUrl: 'views/successView.html',
    controller: 'SuccessController as success',
    authenticate: false
  })
  .state('home', {
    url: '/home',
    templateUrl: 'views/homeView.html',
    controller: 'HomeController as home',
    authenticate: true
  });
});

app.run(function ($rootScope, $state, $auth) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    $rootScope.isAuthenticated = $auth.isAuthenticated();
    if (toState.authenticate && !$auth.isAuthenticated()){
      // User isn’t authenticated
      $state.go('login');
      event.preventDefault();
    }
  });
});

app.service('authInterceptor', function($q) {
    var service = this;

    service.responseError = function(response) {
        if (response.status == 401){
            window.location = "/login";
        }
        return $q.reject(response);
    };
});

app.directive("matchPassword", function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=matchPassword"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.matchPassword = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});
