myApp.controller("HeaderCtrl", ['$scope', '$location','$interval', 'UserAuthFactory', 'AuthenticationFactory',
  function ($scope, $location,$interval, UserAuthFactory, AuthenticationFactory) {
      /*
      $scope.user = {
          username: AuthenticationFactory.user.username,
          expires: AuthenticationFactory.expires
      };*/


this.loadNotifications = function (){

    if(AuthenticationFactory.isLogged)
        AuthenticationFactory.check();
   };


      $interval(function(){
      this.loadNotifications();
   }.bind(this), 10000);    



      $scope.isActive = function (route) {
          return route === $location.path();
      }


      $scope.IsLogin = function (route) {
          return AuthenticationFactory.isLogged;
      }

      $scope.IsAdmin = function (route) {
          return AuthenticationFactory.isAdmin;
      }



      $scope.logout = function () {
          UserAuthFactory.logout();
      }
  }
]);


myApp.controller("Page3Ctrl", ['$scope','$window','datosServer','AuthenticationFactory',
  function ($scope,$window,datosServer,AuthenticationFactory) { 
    $scope.products = datosServer.data; 
   
  }
]);


myApp.controller("UserListCtrl", ['$scope','$window','datosServer','userFactory',"$location",
  function ($scope,$window,datosServer,userFactory,$location) { 
      
    $scope.usuarios = datosServer.data;  
    
    userFactory.lista= datosServer.data;
    
      $scope.Editar = function (User) {
          userFactory.IdEdiccion = User.id;
          $location.path("/UserEdit");
      }
      
      
      $scope.Borrar = function (User) {
          userFactory.IdEdiccion = User.id;
          
          userFactory.borrar1(User).then(function(){
              userFactory.load().then(function(data){
               $scope.usuarios =  data.data;
          });
          });
          
          
          
          
          
          
      }
      
  }
]);

myApp.controller("UserEditCtrl", ['$scope', 'userFactory', "$location",
    function ($scope, userFactory, $location) {

        var result = $.grep(userFactory.lista, function (e) { return e.id == userFactory.IdEdiccion; });


        $scope.user=result[0];

        $scope.save = function () {

            userFactory.update($scope.user);
            $location.path("/UserList");
        }

        $scope.cancelar = function () {

            $location.path("/UserList");
        }

    }
]);

