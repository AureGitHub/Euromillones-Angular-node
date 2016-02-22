
var Q = require("q");
var utils = require('../utils/utils.js');

exports.update = function (Tabla, JugadorToUpdate) {
    
     var deferred = Q.defer();
    utils.update(Tabla,{ id: JugadorToUpdate.id }, JugadorToUpdate).
    then(function(dato){
            JugadorToUpdate.Saldo.id=JugadorToUpdate.id ;
            utils.update(utils.TABLAS.SALDOS,{ id: JugadorToUpdate.id }, JugadorToUpdate.Saldo).then(function(imtem){
             deferred.resolve(dato.dataValues);   
            }).catch(function(error){
                 deferred.reject(error);
            });
        }).catch(function(error){
             deferred.reject(error);
        });
        
        
    return deferred.promise;
        
}