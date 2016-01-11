myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function ($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
      $scope.user = {
          username: 'jdesande',
          password: '123456'
      };

      $scope.login = function () {

          var username = $scope.user.username,
        password = $scope.user.password;

          if (username !== undefined && password !== undefined) {

              UserAuthFactory.login(username, password).success(function (data) {
                
                AuthenticationFactory.SetSession(data.Security);
  

                  $location.path("/");

              }).error(function (status) {
                  alert('Oops something went wrong!');
              });
          } else {
              alert('Invalid credentials');
          }

      };

  }
]);