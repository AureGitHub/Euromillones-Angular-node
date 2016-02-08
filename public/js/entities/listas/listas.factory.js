myApp.factory('listasFactory',[ '$http', 'baseUrl','DireccionesServidor','remoteResource',
function ($http,baseUrl,DireccionesServidor,remoteResource) {
  var listas = {
   
     updateRol: function (rol) {
         
          return  remoteResource.GoServer('PUT',DireccionesServidor.dirRolUpdate,rol.id,rol);
    },
    
    loadEstadoApuesta  :  function () {
          return remoteResource.GoServer('GET',DireccionesServidor.dirEstadoApuestaList,-1,null);
    },
    
     updateEstadoApuesta: function (EstadoApuesta) {
         
          return  remoteResource.GoServer('PUT',DireccionesServidor.dirEstadoApuestaUpdate,EstadoApuesta.id,EstadoApuesta);
    },
    
    
     loadEstadoJugador  :  function () {
          return remoteResource.GoServer('GET',DireccionesServidor.dirEstadoJugadoresList,-1,null);
    },
    
     updateEstadoJugador: function (EstadoJugador) {
         
          return  remoteResource.GoServer('PUT',DireccionesServidor.dirEstadoJugadoresUpdate,EstadoJugador.id,EstadoJugador);
    },
    
    
    loadRoles  :  function () {
          return remoteResource.GoServer('GET',DireccionesServidor.dirRollist,-1,null);
    },
    
    
     update: function (user) {
         
          return  remoteResource.GoServer('PUT',DireccionesServidor.dirUserUpdate,user.id,user);
    },
    
      updateAdmin: function (user) {
          
     return  remoteResource.GoServer('PUT',DireccionesServidor.dirAdminUserUpdate,user.id,user);
      
    },
    
     create: function (user) {  
         return  remoteResource.GoServer('POST',DireccionesServidor.dirUserCreate,-1,user);
    },
    
     borrar: function (user) {
          return  remoteResource.GoServer('DELETE',DireccionesServidor.dirAdminUserDelete,user.id,user);
    },
    
    
    
  };

  return listas;
}]);