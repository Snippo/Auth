app.controller('SuccessController', SuccessController);

function SuccessController($scope, $auth, $state) {
  $scope.message = "Account succesfully created. Please login using the credentials used for registering."

  $scope.redirect = "You will be automatically redirected. Click here to go to the login page."

  setTimeout(function() {
    $state.go("login");
  }, 5000);

};
