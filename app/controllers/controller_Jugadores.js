
var Q = require("q");
var utils = require('../utils/utils.js');

exports.update = function (Tabla, JugadorToUpdate) {
    
    
    JugadorToUpdate.Saldo.id=JugadorToUpdate.id ;
    
     var deferred = Q.defer();
     
      Q.all([
      utils.update(Tabla,{ id: JugadorToUpdate.id }, JugadorToUpdate),
      utils.update(utils.TABLAS.SALDOS,{ id: JugadorToUpdate.id }, JugadorToUpdate.Saldo)
    ])
    .then(function() {
      deferred.resolve(JugadorToUpdate)
    })
    .catch(function(error) {
      deferred.reject(error);
    })
     
    
     /*
    utils.update(Tabla,{ id: JugadorToUpdate.id }, JugadorToUpdate).
    then(function(dato){
            
            utils.update(utils.TABLAS.SALDOS,{ id: JugadorToUpdate.id }, JugadorToUpdate.Saldo).then(function(imtem){
             deferred.resolve(dato.dataValues);   
            }).catch(function(error){
                 deferred.reject(error);
            });
        }).catch(function(error){
             deferred.reject(error);
        });*/
        
        
    return deferred.promise;
        
}