
//This Factory is responsible for checking the user status on the client side.
myApp.factory('AuthenticationFactory', ['$window', '$location', 'ROLES', function ($window, $location, ROLES) {




  var auth = {

  User : null,

    isLogged : function(){
          return $window.sessionStorage.token;
        },
        
        
    isAdmin : function(){
       return (this.User && this.User.IdRol == ROLES.ADMIN);
        },
        
    isUsuario: function(){
       return (this.User && this.User.IdRol == ROLES.USUARIO);
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
myApp.factory('UserAuthFactory', ['$window', '$location', '$http', 'AuthenticationFactory', 'baseUrl', 'remoteResource',
function ($window, $location, $http, AuthenticationFactory, BaseUrl, remoteResource) {


  return {
    login: function (username, password) {
      
      var user = {
        username:username,
        password : password
      };
       return  remoteResource.GoServer('POST','/login',-1,user);
    },

    logout: function () {

      if (AuthenticationFactory.isLogged()) {
        AuthenticationFactory.deconectar();

        
      }

    }
  }
}]);


function AntesDeIrServidor($rootScope)
{
   $rootScope.session.VerMonedaServer = true;
   $( ":button" ).button('loading');
}


function FinDeIrServidor($rootScope)
{
  $rootScope.session.VerMonedaServer = false;
  $( ":button" ).button('reset');
}

 
//This factory is responsible for sending in the access token and the key along with each request to the server.
myApp.factory('TokenInterceptor',['$q','$window','AuthenticationFactory','$rootScope',
function ($q, $window,AuthenticationFactory,$rootScope) {
  return {
    request: function (config) {
       
       AntesDeIrServidor($rootScope);
        
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        //config.headers['X-Key'] = $window.sessionStorage.user;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },

    response: function (response) {
      
      FinDeIrServidor($rootScope);
      
      return response || $q.when(response);
    },
    
     responseError: function (response) {
           FinDeIrServidor($rootScope);
      return $q.reject(response);
    }
    
  };
}]);