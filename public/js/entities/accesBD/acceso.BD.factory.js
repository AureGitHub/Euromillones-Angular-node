myApp.factory('accesoBDfactory', ['$http', 'apiAdmin', 'apiPrivate', 'remoteResource',
    function($http, apiAdmin, apiPrivate, remoteResource) {
        var operacion = {
            create: function(Tabla, item) {
                return remoteResource.GoServer('POST', apiAdmin + Tabla, -1, item);
            },
            get: function(Tabla, id) {
                if(!id)
                    return remoteResource.GoServer('GET', apiAdmin + Tabla, -1, null);
                else
                return remoteResource.GoServer('GET', apiAdmin + Tabla, id, null);
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
             getMovimientos: function(Tabla, id) {
                return remoteResource.GoServer('GET', apiPrivate + Tabla, id, null);
            },
            

        };

        return operacion;
    }
]);