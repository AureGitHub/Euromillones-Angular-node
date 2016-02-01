var Q = require("q");


exports.CrearTabla = function(Tabla, datosIniciales) {
    var deferred = Q.defer();

    Tabla.count().then(function(count) {
            if (count === 0) { // la tabla se inicializa solo si está vacía
                Tabla.bulkCreate(datosIniciales).then(function() {
                    console.log('<<' + Tabla.name + '>> inicializada');
                    deferred.resolve();
                });
            }
            else {
                console.log('<<' + Tabla.name + '>> contiene ' + count + ' elementos');
                deferred.resolve();
            }

        })
        .catch(function(error) {
            deferred.reject(error);
        });

    return deferred.promise;

}


exports.Update = function(Tabla, where, updatePropio, itemUpdated) {
    var deferred = Q.defer();

    Tabla.find({
        where: where
    }).then(function(item) {
        if (item) {
            updatePropio(item, itemUpdated);
            item.save().then(function() {
                deferred.resolve(item);
            });

        }
        else {
            deferred.reject('No se ha encontrado el objeto');
        }
    }).catch(function(error) {
        deferred.reject(error);
    });

    return deferred.promise;

}




exports.GetData = function(Tabla, where, req, res, next) {

    if (where) {
        Tabla.find({
            where: where
        }).then(function(dato) {
            res.data = dato;
            next();
        }).catch(function(error) {
            next(error);
        });
    }
    else {
        Tabla.findAll().then(function(dato) {
                res.data = dato;
                next();
            })
            .catch(function(error) {
                next(error);
            });
    }


}