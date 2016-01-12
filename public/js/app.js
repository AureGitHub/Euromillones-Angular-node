var myApp = angular.module('angularTodo', ["ngRoute", "ngStorage","angular-growl"]);


myApp.constant('ROLES', {
    ADMIN: 1,
    USUARIO: 2
    }
 );


var BaseUrl =myURL;

var DireccionesServidor = {
  Login : '/login',
  dirAdminUserUpdate : '/api/admin/user',
  dirAdminUserDelete : '/api/admin/user',
  dirUserlist : '/api/admin/UserList',
  dirRollist : '/api/admin/RolList',
  dirProductoslist : '/api/private/products',
  dirUserUpdate : '/api/private/user',
  dirUserCreate : '/api/admin/user',
};



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
            if(status >= 500)
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
myApp.constant('DireccionesServidor',DireccionesServidor);

myApp.config(['baseUrl','DireccionesServidor', 'remoteResourceProvider',
  function (baseUrl,DireccionesServidor, remoteResourceProvider) {
    remoteResourceProvider.setBaseUrl(baseUrl);   
  }
]);



myApp.config(["$routeProvider", "$httpProvider","ROLES", "growlProvider",
function ($routeProvider, $httpProvider,ROLES,growlProvider) {


 growlProvider.globalTimeToLive({success: 2000});
 growlProvider.globalPosition('top-center');

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
          return remoteResource.GoServer('GET',DireccionesServidor.dirUserlist,-1,null);
          }]
      } 
    })
    .when('/RolList', {
      templateUrl: 'views/RolList.html',
      data: {
			authorized: [ROLES.ADMIN]
		},
      controller: 'RolListCtrl',
      resolve: {
        datosServer: ['remoteResource', function (remoteResource) {
          return remoteResource.GoServer('GET',DireccionesServidor.dirRollist,-1,null);
          }]
      } 
    })
    .when('/UserEdit', {
      templateUrl: 'views/UserEdit.html',
      controller: 'UserEditCtrl',
      FromMenu : true,
       data: {
			  authorized: [ROLES.USUARIO]
		  }
    })
    
    .when('/UserEditAdmin', {
      templateUrl: 'views/UserEdit.html',
      controller: 'UserEditCtrl',
      FromMenu : false,
       data: {
			  authorized: [ROLES.ADMIN]
		  }
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

myApp.run(["$rootScope", "$window", "$location", "AuthenticationFactory","ROLES", function ($rootScope, $window, $location, AuthenticationFactory,ROLES) {
    // when the page refreshes, check if the user is already logged in
    AuthenticationFactory.check();

    $rootScope.session = AuthenticationFactory;

    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {        

        if(nextRoute.data!=null && nextRoute.data.authorized!=null)
        {
            if(!AuthenticationFactory.isLogged())
            {
                 $location.path("/");
                 return;
            }

            if($.inArray(ROLES.ADMIN, nextRoute.data.authorized) > -1 && !AuthenticationFactory.isAdmin()){
                $location.path("/");
                return;
            }

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

    
