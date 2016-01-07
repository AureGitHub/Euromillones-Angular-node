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
      return $http.put(baseUrl + DireccionesServidor.dirAdminUserUpdate + "/" + user.id , {
        user: user
      });
    },
    
     borrar1: function (user) {
          return   remoteResource.DeleteServer(DireccionesServidor.dirAdminUserDelete,user.id,user);
    },
    
    
     borrar: function (user) {
      return $http.delete(baseUrl + DireccionesServidor.dirAdminUserDelete + "/" + user.id , {
        user: user
      });
    },
    
    
  };

  return user;
}]);