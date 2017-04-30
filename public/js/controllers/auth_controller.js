app.controller('LoginController', AuthController);

function LoginController($http, $auth, $state) {
  var vm = this;

  if ($auth.isAuthenticated()) {
    $state.go('home', {});
  };

  vm.login = function() {

    var credentials = {
      username: vm.email,
      password: vm.password,
      client_id: '2',
      client_secret: 'cMWh5lR4WneROvkNtFFArgIVNMgsgIrTDrpopqbZ',
      grant_type: 'password'
    }

    // Use Satellizer's $auth service to login
    $auth.login(credentials).then(function(response) {
      $auth.setToken(response.data.access_token);
      // If login is successful, redirect to the users state
      $http.get('/api/user').then();
      //$state.go('home', {});
    });
  }

}
