app.controller('LoginController', LoginController);

function LoginController($scope, $http, $auth, $state) {
  // If already authenticated, redirect to home page
  if ($auth.isAuthenticated()) {
    $state.go('home', {});
  };

  $scope.login = function() {

    var credentials = {
      username: $scope.auth.email,
      password: $scope.auth.password,
      client_id: '2',
      client_secret: 'cMWh5lR4WneROvkNtFFArgIVNMgsgIrTDrpopqbZ',
      grant_type: 'password'
    }

    // Use Satellizer's $auth service to login
    $auth.login(credentials).then(function(response) {
      $auth.setToken(response.data.access_token);
      // If login is successful, redirect to the home state
      $state.go('home', {});
    });
  }

}
