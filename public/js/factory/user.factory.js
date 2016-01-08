myApp.factory('userFactory',[ '$http', 'baseUrl','DireccionesServidor','remoteResource',
function ($http,baseUrl,DireccionesServidor,remoteResource) {
  /** https://docs.angularjs.org/guide/providers **/
  var user = {
    lista: {},
    IdEdiccion : null,
    
    load  :  function () {
      return   remoteResource.GetServer(DireccionesServidor.dirUserlist);
    },
     update: function (user) {
      return $http.put(baseUrl + DireccionesServidor.dirUserUpdate + "/" + user.id , {
        user: user
      });
    },
    
      updateAdmin: function (user) {
          
     return  remoteResource.GoServer('PUT',DireccionesServidor.dirAdminUserUpdate,user.id,user);
      
    },
    
     create: function (user) {
      return $http.put(baseUrl + DireccionesServidor.dirAdminUserUpdate + "/" + user.id , {
        user: user
      });
    },
    
     borrar: function (user) {
          return  remoteResource.GoServer('DELETE',DireccionesServidor.dirAdminUserDelete,user.id,user);
    },
    
    
    
  };

  return user;
}]);