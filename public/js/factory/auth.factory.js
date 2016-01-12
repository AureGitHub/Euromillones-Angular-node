
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
          this.FechaInExpire = "CADUCADA!!!!";
         this.deconectar();
          

        }
        else {
          
           if($window.sessionStorage.User)
              this.User = JSON.parse($window.sessionStorage.User);
          
          var pad = "00";
          var hora = pad.substring(0, pad.length - dateExpire.getHours().toString().length) + dateExpire.getHours().toString();
          var min = pad.substring(0, pad.length - dateExpire.getMinutes().toString().length) + dateExpire.getMinutes().toString();
          this.FechaInExpire = hora + ":" +  min;
          
        }


      } else {
         this.deconectar();
      }
    },
  }

  return auth;
}]);

// his factory is responsible for contacting the login endpoint and validating the user. And also logging out the user.
myApp.factory('UserAuthFactory', ['$window', '$location', '$http', 'AuthenticationFactory', 'baseUrl', 'DireccionesServidor', 'remoteResource',
function ($window, $location, $http, AuthenticationFactory, BaseUrl, DireccionesServidor,remoteResource) {


  return {
    login: function (username, password) {
      
      var user = {
        username:username,
        password : password
      };
       return  remoteResource.GoServer('POST',DireccionesServidor.Login,-1,user);
    },

    logout: function () {

      if (AuthenticationFactory.isLogged()) {
        AuthenticationFactory.deconectar();

        
      }

    }
  }
}]);
 
//This factory is responsible for sending in the access token and the key along with each request to the server.
myApp.factory('TokenInterceptor',['$q','$window','AuthenticationFactory','$rootScope',
function ($q, $window,AuthenticationFactory,$rootScope) {
  return {
    request: function (config) {
        $rootScope.session.VerMonedaServer = true;
        
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        //config.headers['X-Key'] = $window.sessionStorage.user;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },

    response: function (response) {
      $rootScope.session.VerMonedaServer = false;
      console.log("status :" + response.status);
     
      return response || $q.when(response);
    },
    
     responseError: function (response) {
          $rootScope.session.VerMonedaServer = false;
      return $q.reject(response);
    }
    
  };
}]);