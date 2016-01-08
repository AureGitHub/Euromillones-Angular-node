var myApp = angular.module('angularTodo', ['ngRoute', 'ngStorage']);


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
  dirProductoslist : '/api/private/products',
  dirUserUpdate : '/api/private/user',
};



function RemoteResource($http, $q, AuthenticationFactory,baseUrl) {

    this.GetServer = function (direccion)
    {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
            method: 'GET',
            url: baseUrl + direccion
        }).success(function (data, status, headers, config)
        {
            AuthenticationFactory.SetSession(data.Security);
            defered.resolve(data);
        }).error(function (data, status, headers, config)
        {
            defered.reject(status);
        });
        return promise;
    }
    
    
    this.DeleteServer = function (direccion, id, objeto)
    {
        var defered = $q.defer();
        var promise = defered.promise;


        $http({
            method: 'DELETE',
            url: baseUrl + direccion + "/" + id,
            data : objeto
        }).success(function (data, status, headers, config)
        {
            AuthenticationFactory.SetSession(data.Security);
            defered.resolve(data);
        }).error(function (data, status, headers, config)
        {
            defered.reject(status);
        });
        return promise;
    }
    
}


function RemoteResourceProvider() {
  var _baseUrl;
  
  
  this.setBaseUrl = function (baseUrl) {
    _baseUrl = baseUrl;
  } 
 
  
  this.$get = ['$http', '$q', 'AuthenticationFactory', function ($http, $q,AuthenticationFactory) {

    return new RemoteResource($http, $q,AuthenticationFactory, _baseUrl);
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



myApp.config(["$routeProvider", "$httpProvider","ROLES", function ($routeProvider, $httpProvider,ROLES) {

  $httpProvider.interceptors.push('TokenInterceptor');

  $routeProvider
   .when('/', {
      templateUrl: 'views/home.html'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    }).when('/page3', {
      templateUrl: 'views/page3.html',
      controller: 'Page3Ctrl',
      data: {
			authorized: [ROLES.USUARIO]
		},
        resolve: {
        datosServer: ['remoteResource', function (remoteResource) {
          return remoteResource.GetServer(DireccionesServidor.dirProductoslist);
          }]
      } 
    }).when('/UserList', {
      templateUrl: 'views/UserList.html',
      data: {
			authorized: [ROLES.ADMIN]
		},
      controller: 'UserListCtrl',
      resolve: {
        datosServer: ['remoteResource', function (remoteResource) {
          return remoteResource.GetServer(DireccionesServidor.dirUserlist);
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
      redirectTo: '/login'
    });
}]);

myApp.run(["$rootScope", "$window", "$location", "AuthenticationFactory","ROLES", function ($rootScope, $window, $location, AuthenticationFactory,ROLES) {
    // when the page refreshes, check if the user is already logged in
    AuthenticationFactory.check();

    $rootScope.session = AuthenticationFactory;

    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {        

        if(nextRoute.data!=null && nextRoute.data.authorized!=null)
        {
            if(!AuthenticationFactory.isLogged)
            {
                 $location.path("/");
                 return;
            }

            if($.inArray(ROLES.ADMIN, nextRoute.data.authorized) > -1 && !AuthenticationFactory.isAdmin){
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

    
