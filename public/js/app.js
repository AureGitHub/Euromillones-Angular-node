var myApp = angular.module('angularTodo', ['ngRoute', 'ngStorage','angular-growl','ui.bootstrap','ui.grid','ngDialog']);


myApp.constant('ROLES', {
    ADMIN: 1,
    USUARIO: 2
    }
 );


var BaseUrl =myURL;

var apiAdmin = '/api/admin/';
var apiPrivate = '/api/private/';



myApp.filter("filteri18n",["$filter",function($filter) {
  var filterFn=$filter("filter");
   
  /** Transforma el texto quitando todos los acentos diéresis, etc. **/
  function normalize(texto) {
    texto = texto.replace(/[áàäâ]/g, "a");
    texto = texto.replace(/[éèëê]/g, "e");
    texto = texto.replace(/[íìïî]/g, "i");
    texto = texto.replace(/[óòôö]/g, "o");
    texto = texto.replace(/[úùüü]/g, "u");
    texto = texto.toUpperCase();
    return texto;
  }
    
  /** Esta función es el comparator en el filter **/
  function comparator(actual, expected) {
      if (normalize(actual).indexOf(normalize(expected))>=0) {
        return true;
      } else {
        return false;
      }
  }
   
  /** Este es realmente el filtro **/
  function filteri18n(array,expression) {
    //Lo único que hace es llamar al filter original pero pasado
    //la nueva función de comparator
    return filterFn(array,expression,comparator)
  }
   
  return filteri18n;
   
}]);





function RemoteResource($http, $q, AuthenticationFactory,baseUrl,growl,$window) {

    
    
    this.GoServer = function (method,direccion, id, objeto)
    {
        var defered = $q.defer();
        var promise = defered.promise;
        
        
        var url =  baseUrl + direccion;
        
        if(id >-1)
          url +="/" + id;

        $http({
            method: method,
            url: url,
            data : objeto
        }).success(function (data, status, headers, config)
        {
          AuthenticationFactory.SetSession(data.Security);
          defered.resolve(data);
        }).error(function (data, status, headers, config)
        {
            if(status >= 500 || status==-1)
            {
                growl.error("Se ha producido un error en el servidor. Póngase en contacto con el administrador. Código error (" + status + ")",{title: 'Error Fatal'});
                 
            }
            else
            {
                growl.error(data.message ,{title: 'Error'});
            }
            defered.reject(data);
            
        });
        return promise;
    }
    
    
    
   
    
}


function RemoteResourceProvider() {
  var _baseUrl;
  
  
  this.setBaseUrl = function (baseUrl) {
    _baseUrl = baseUrl;
  } 
 
  
  this.$get = ['$http', '$q', 'AuthenticationFactory','growl', '$window',
  function ($http, $q,AuthenticationFactory,growl,$window) {

    return new RemoteResource($http, $q,AuthenticationFactory, _baseUrl,growl,$window);
  }];
}


myApp.provider("remoteResource", RemoteResourceProvider);

myApp.constant('baseUrl', BaseUrl);
myApp.constant('apiAdmin', apiAdmin);
myApp.constant('apiPrivate', apiPrivate);


myApp.constant('Tablas', TABLA);



myApp.config(['baseUrl', 'remoteResourceProvider',
  function (baseUrl,remoteResourceProvider) {
    remoteResourceProvider.setBaseUrl(baseUrl);   
  }
]);



myApp.config(["$routeProvider", "$httpProvider","ROLES", "growlProvider",
function ($routeProvider, $httpProvider,ROLES,growlProvider) {


 growlProvider.globalTimeToLive({success: 2000});
 growlProvider.globalPosition('top-center');
 growlProvider.onlyUniqueMessages(false);

  $httpProvider.interceptors.push('TokenInterceptor');
  
   
  $routeProvider
   .when('/', {
      templateUrl: 'views/home.html',
       controller: 'HomeCtrl'
    })
    
     .when('/UserList', {
      templateUrl: 'views/UserList.html',
      data: {
			authorized: [ROLES.ADMIN]
		},
      controller: 'UserListCtrl',
      resolve: {
        datosServer: ['remoteResource', function (remoteResource) {
          return remoteResource.GoServer('GET', apiAdmin + TABLA.Jugadores,-1,null);
          }]
      } 
    })
    
  .when('/MisDatos', {
      templateUrl: 'views/MisDatos.html',
      data: {
			  authorized: [ROLES.ADMIN,ROLES.USUARIO]
		  },
      controller: 'MisDatosCtrl',
     
    })
   
   
     .when('/RolList', {
      templateUrl: 'views/GenericList.html',
      TablaDatos : TABLA.TiposRoles,
      Titulo : 'Tipos de Roles',
      data: {
			authorized: [ROLES.ADMIN]
		},
      controller: 'GenericListCtrl',
      resolve: {
        datosServer: ['remoteResource', function (remoteResource) {
          return remoteResource.GoServer('GET',apiAdmin + TABLA.TiposRoles,-1,null);
          }]
      } 
    })
    
     .when('/EstadoJugadoresList', {
      templateUrl: 'views/GenericList.html',
      TablaDatos : TABLA.TiposEstadosJugador,
      Titulo : 'Tipos de Estados de Jugador',
      data: {
			authorized: [ROLES.ADMIN]
		},
      controller: 'GenericListCtrl',
      resolve: {
        datosServer: ['remoteResource', function (remoteResource) {
          return remoteResource.GoServer('GET',apiAdmin + TABLA.TiposEstadosJugador,-1,null);
          }]
      } 
    })
    
     .when('/EstadoApuestaList', {
      templateUrl: 'views/GenericList.html',
      TablaDatos : TABLA.TiposEstadosApuesta,
      Titulo : 'Tipos de Estados de Apuesta',
      data: {
			authorized: [ROLES.ADMIN]
		},
      controller: 'GenericListCtrl',
      resolve: {
        datosServer: ['remoteResource', function (remoteResource) {
          return remoteResource.GoServer('GET',apiAdmin + TABLA.TiposEstadosApuesta,-1,null);
          }]
      } 
    })
    
    .when('/TiposMovimientos', {
      templateUrl: 'views/GenericList.html',
      TablaDatos : TABLA.TiposMovimientos,
      Titulo : 'Tipos de Movimientos',
      data: {
			authorized: [ROLES.ADMIN]
		},
      controller: 'GenericListCtrl',
      resolve: {
        datosServer: ['remoteResource', function (remoteResource) {
          return remoteResource.GoServer('GET',apiAdmin + TABLA.TiposMovimientos,-1,null);
          }]
      } 
    })
    
    
    
    .when('/Refresh', {
     
     redirectTo: '/',
       data: {
			  authorized: [ROLES.ADMIN,ROLES.USUARIO]
		  },
		resolve: {
        datosServer: ['remoteResource', function (remoteResource) {
          return remoteResource.GoServer('GET',apiPrivate + 'Refresh',-1,null);
          }]
      } 
    })
    
    .when('/UserEdit', {
      templateUrl: 'views/UserEdit.html',
      controller: 'UserEditCtrl',
       data: {
			  authorized: [ROLES.ADMIN,ROLES.USUARIO]
		  }
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

myApp.run(["$rootScope", "$window", "$location", "AuthenticationFactory","ROLES", function ($rootScope, $window, $location, AuthenticationFactory,ROLES) {
    // when the page refreshes, check if the user is already logged in
    AuthenticationFactory.check();
    
     $rootScope.normalizeTexto = function(texto) {
            texto = texto.replace(/[áàäâ]/g, "a");
            texto = texto.replace(/[éèëê]/g, "e");
            texto = texto.replace(/[íìïî]/g, "i");
            texto = texto.replace(/[óòôö]/g, "o");
            texto = texto.replace(/[úùüü]/g, "u");
            texto = texto.toUpperCase();
            return texto;
        };
        
        
         $rootScope.beforeUpdate = function(objectInicial, objectUpdate) {
            for(var propertyName in objectInicial) {
                if(propertyName.indexOf('$$')<0)
                    objectUpdate[propertyName + '$']=objectInicial[propertyName];
            }
        };
        
        
         $rootScope.beforeUpdate = function(objectInicial) {
            for(var propertyName in objectInicial) {
                if(propertyName.indexOf('$$')<0 && propertyName.indexOf('$')<0)
                    objectInicial[propertyName + '$']=objectInicial[propertyName];
            }
        };
        
         $rootScope.afterUpdate = function(objectInicial ) {
            for(var propertyName in objectInicial) {
                if(propertyName.indexOf('$$')<0)
                    if(propertyName.indexOf('$')>-1)
                        objectInicial[propertyName.replace('$','')]=objectInicial[propertyName];
            }
        };
        
        

    $rootScope.session = AuthenticationFactory;
    
    $rootScope.session.VerMonedaServer = false;

    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {        

        if(nextRoute.data!=null && nextRoute.data.authorized!=null)
        {
            
            
            
            if($.inArray(ROLES.ADMIN, nextRoute.data.authorized) > -1 && AuthenticationFactory.isAdmin()){
                return;
            }
            
            if($.inArray(ROLES.USUARIO, nextRoute.data.authorized) > -1 && AuthenticationFactory.isUsuario()){
                return;
            }
            
            
            $location.path("/");
            

        }
       
    });

    /*
    $rootScope.$on('$routeChangeSuccess', function (event, nextRoute, currentRoute) {
        $rootScope.showMenu = AuthenticationFactory.isLogged;
        $rootScope.role = AuthenticationFactory.userRole;
        // if the user is already logged in, take him to the home page
        if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
            $location.path('/');
        }
    });*/
}]);

    
