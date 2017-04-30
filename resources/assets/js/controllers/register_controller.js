app.controller('RegisterController', RegisterController);

function RegisterController($scope, $http, $auth, $state) {

  $scope.register = function() {
    var user = {'email': $scope.email, 'password': $scope.password};
    $http.post('/api/register', user)
    .then(
      function(response){
        // success callback
        $scope.errorMessage = null;
        $state.go('success');
      },
      function(response){
        // failure callback
        $scope.errorMessage = response.data;
      }
    );
  }
};
