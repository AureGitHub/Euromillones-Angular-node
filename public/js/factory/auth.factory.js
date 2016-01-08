
//This Factory is responsible for checking the user status on the client side.
myApp.factory('AuthenticationFactory', ['$window', '$location', 'ROLES', function ($window, $location, ROLES) {




  var auth = {



    isLogged: false,
    isAdmin: false,
    isUsuario: false,
    UserCompleto : null,
    SetSession: function (Security) {

      $window.sessionStorage.token = Security.token;
      $window.sessionStorage.username = Security.user.username;
      $window.sessionStorage.role = Security.user.role;
      $window.sessionStorage.expires = Security.user.expires;
      this.check();

    },
    check: function () {
      if ($window.sessionStorage.token && $window.sessionStorage.token) {


        var today = new Date();
        var dateExpire = new Date(parseInt($window.sessionStorage.expires));
        var diffMs = (dateExpire - today); // milliseconds between now & dateExpire
    
        var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes       
          
        if (diffHrs == 0 && diffMins == 0) //Session ha muerto
        {

          alert('Su sesión ha caducado!!!!!!');

          this.FechaInExpire = "CADUCADA!!!!";
          this.isLogged = false;
          this.isAdmin = false;
          this.isUsuario = false;
          delete this.user;
          delete $window.sessionStorage.token;
          delete $window.sessionStorage.user;
          delete this.UserCompleto;
          
          $location.path("/login");

        }
        else {
          this.user = {
            username: $window.sessionStorage.username,
            role: $window.sessionStorage.role,
            expires: $window.sessionStorage.expires
          };
          
          if($window.sessionStorage.UserCompleto)
            this.UserCompleto = JSON.parse($window.sessionStorage.UserCompleto);
          
          
          

          var pad = "00";

          this.FechaInExpire = 'Horas :' + pad.substring(0, pad.length - diffHrs.toString().length) + diffHrs +
          "  Min:" + pad.substring(0, pad.length - diffMins.toString().length) + diffMins;
          this.isLogged = true;
          this.isAdmin = this.user.role == ROLES.ADMIN;
          this.isUsuario = this.user.role == ROLES.USUARIO;
        }


      } else {
        this.isLogged = false;
        this.isAdmin = false;
        this.isUsuario = false;
        delete this.user;


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

        AuthenticationFactory.isLogged = false;
        delete AuthenticationFactory.user;


        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user;


        $location.path("/login");
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