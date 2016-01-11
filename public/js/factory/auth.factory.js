
//This Factory is responsible for checking the user status on the client side.
myApp.factory('AuthenticationFactory', ['$window', '$location', 'ROLES', function ($window, $location, ROLES) {




  var auth = {

  User : null,

    isLogged : function(){
          return $window.sessionStorage.token;
        },
        
        
    isAdmin : function(){
       return (this.User && this.User.role == ROLES.ADMIN);
        },
        
    isUsuario: function(){
       return (this.User && this.User.role == ROLES.USUARIO);
        },
    
    
    SetSession: function (Security) {
      $window.sessionStorage.token = Security.token;
      $window.sessionStorage.expires = Security.expires;
      $window.sessionStorage.User = JSON.stringify(Security.user);
      
      if($window.sessionStorage.User)
            this.User = JSON.parse($window.sessionStorage.User);
      this.check();

    },
    deconectar : function()
    {
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.expires;
        delete $window.sessionStorage.User;
        delete this.User;
        
    },
    check: function () {
      if ($window.sessionStorage.token) {
        var today = new Date();
        var dateExpire = new Date(parseInt($window.sessionStorage.expires));
        var diffMs = (dateExpire - today); // milliseconds between now & dateExpire
    
        var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes       
          
        if (diffHrs == 0 && diffMins == 0) //Session ha muerto
        {

          alert('Su sesión ha caducado!!!!!!');

          this.FechaInExpire = "CADUCADA!!!!";
         
         this.deconectar();
          
          $location.path("/login");

        }
        else {
          
           if($window.sessionStorage.User)
              this.User = JSON.parse($window.sessionStorage.User);
          
          this.FechaInExpire = dateExpire.getHours() + ":" +  dateExpire.getMinutes();
          
        }


      } else {
         this.deconectar();
      }
    },
  }

  return auth;
}]);

// his factory is responsible for contacting the login endpoint and validating the user. And also logging out the user.
myApp.factory('UserAuthFactory', ['$window', '$location', '$http', 'AuthenticationFactory', 'baseUrl', 'DireccionesServidor', function ($window, $location, $http, AuthenticationFactory, BaseUrl, DireccionesServidor) {


  return {
    login: function (username, password) {
      return $http.post(BaseUrl + DireccionesServidor.Login, {
        username: username,
        password: password
      });
    },

    logout: function () {

      if (AuthenticationFactory.isLogged) {
        AuthenticationFactory.deconectar();

        
      }

    }
  }
}]);
 
//This factory is responsible for sending in the access token and the key along with each request to the server.
myApp.factory('TokenInterceptor', function ($q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        //config.headers['X-Key'] = $window.sessionStorage.user;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },

    response: function (response) {
      return response || $q.when(response);
    }
  };
});