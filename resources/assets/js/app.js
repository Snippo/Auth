var app = angular.module('authApp', ['ui.router', 'satellizer'])
.config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider, $httpProvider) {

  $locationProvider.html5Mode(true).hashPrefix('!');
  // Satellizer configuration that specifies which API
  // route the JWT should be retrieved from
  $authProvider.loginUrl = '/oauth/token';

  // Redirect to the auth state if any other states
  // are requested other than users
  $urlRouterProvider.otherwise('/home');

  $httpProvider.interceptors.push(['$location', '$injector', '$q', function ($location, $injector, $q) {
             return {
                 'responseError': function (rejection) {
                     if (rejection.status === 401) {

                         //injected manually to get around circular dependency problem.
                         var AuthService = $injector.get('$auth');

                         //if server returns 401 despite user being authenticated on app side, it means session timed out on server
                         if (AuthService.isAuthenticated()) {
                             AuthService.logout();
                         }
                         $location.path('/login');
                         return $q.reject(rejection);
                     }
                 }
             };
         }]);

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
      $auth.logout()
      $state.go('login');
      event.preventDefault();
    }
  });
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
