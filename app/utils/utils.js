var Q = require("q");

var updatePropio = require('../utils/updatePropio.js');
var models = require('../models/models.js');


exports.TABLAS = {
    TIPOSROLES: 'TiposRoles',
    APUESTAS: 'Apuestas',
    JUGADORES: 'Jugadores',
    TIPOSESTADOSAPUESTA: 'TiposEstadosApuesta',
    TIPOSUSUARIOESTADO: 'TiposUsuarioEstado'
    
};



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


exports.Update = function(Tabla, where,itemUpdated,extraUpdatePropio) {
    var deferred = Q.defer();
    
    if(!extraUpdatePropio) // Si no se especifica ninguno propio, se utiliza el basico para cada tabla
        extraUpdatePropio=models[Tabla].name;

    models[Tabla].find({
        where: where
    }).then(function(item) {
        if (item) {
            updatePropio[extraUpdatePropio](item, itemUpdated);
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
         models[Tabla].find({
            where: where
        }).then(function(dato) {
            res.data = dato;
            next();
        }).catch(function(error) {
            next(error);
        });
    }
    else {
         models[Tabla].findAll().then(function(dato) {
                res.data = dato;
                next();
            })
            .catch(function(error) {
                next(error);
            });
    }


}