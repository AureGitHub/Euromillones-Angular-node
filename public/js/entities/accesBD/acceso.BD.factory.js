myApp.factory('accesoBDfactory', ['$http', 'apiAdmin', 'apiPrivate', 'remoteResource',
    function($http, apiAdmin, apiPrivate, remoteResource) {
        var operacion = {
            create: function(Tabla, item) {
                return remoteResource.GoServer('POST', apiAdmin + Tabla, -1, item);
            },
            get: function(Tabla) {
                return remoteResource.GoServer('GET', apiAdmin + Tabla, -1, null);
            },
            update: function(Tabla, item) {

                return remoteResource.GoServer('PUT', apiAdmin + Tabla, item.id, item);
            },

            delete: function(Tabla, item) {
                return remoteResource.GoServer('DELETE', apiAdmin + Tabla, item.id, item);
            },
            
            updateJugadoresNoAdmin: function (Tabla,user) {
             return  remoteResource.GoServer('PUT', apiPrivate + Tabla , user.id,user);
              
            },
            

        };

        return operacion;
    }
]);