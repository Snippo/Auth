app.controller('HomeController', HomeController);

  function HomeController($scope, $auth, $state, $http) {
    $scope.logout = function() {
      $auth.logout();
      $state.go('login');
    }

    $http.get('/api/user').then(function(response) {
      $scope.user = response.data;
    });
  };
