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

                  $window.sessionStorage.token = data.token;
                  $window.sessionStorage.username = data.user.username;
                  $window.sessionStorage.role = data.user.role;
                  $window.sessionStorage.expires = data.user.expires;                 

                  AuthenticationFactory.check();

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