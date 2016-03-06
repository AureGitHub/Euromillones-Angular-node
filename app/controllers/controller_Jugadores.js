
var Q = require("q");
var utils = require('../utils/utils.js');


exports.create = function (Tabla, JugadorToAdd) {
    
   
    
     var deferred = Q.defer();
     
     utils.create(utils.TABLAS.JUGADORES,JugadorToAdd)
    .then(function(newJugador){
        
        JugadorToAdd.Saldo.id=newJugador.id;
        utils.create(utils.TABLAS.SALDOS, JugadorToAdd.Saldo)
        .then(function(Saldo){
            newJugador.dataValues.Saldo=Saldo.dataValues;
             utils.create(utils.TABLAS.MOVIMIENTOS, {idJugador:newJugador.dataValues.id,idTipoMovimiento:3,cantidad :Saldo.dataValues.saldo })
            .then(function(){
                deferred.resolve(newJugador);
            })
            
           
        })
        .catch(function(error){
            deferred.reject(error);
        });   
            
        })
    .catch(function(error){
        deferred.reject(error);
    });
     
    
    
    return deferred.promise;
        
}

exports.update = function (Tabla, JugadorToUpdate) {
    
    JugadorToUpdate.Saldo.id=JugadorToUpdate.id ;
    
     var deferred = Q.defer();
     
     utils.update(Tabla,{ id: JugadorToUpdate.id }, JugadorToUpdate)
     .then(function(JugadorUpdated){
         utils.update(utils.TABLAS.SALDOS,{ id: JugadorToUpdate.id }, JugadorToUpdate.Saldo).then(function(saldoUpdated){
             if(!JugadorUpdated.Saldo || JugadorUpdated.Saldo.saldo!=saldoUpdated.saldo){
                 utils.create(utils.TABLAS.MOVIMIENTOS, {idJugador:JugadorToUpdate.id,idTipoMovimiento:3,cantidad :JugadorToUpdate.Saldo.saldo }).then(function(Saldo) {
                      deferred.resolve(JugadorToUpdate)
                 })
                  .catch(function(error) {
                          deferred.reject(error);
                     })
             }
             else{
                  deferred.resolve(JugadorToUpdate)
             }
         })
         .catch(function(error) {
              deferred.reject(error);
         })
     })
     .catch(function(error) {
      deferred.reject(error);
    })
     
      Q.all([
      utils.update(Tabla,{ id: JugadorToUpdate.id }, JugadorToUpdate),
      utils.update(utils.TABLAS.SALDOS,{ id: JugadorToUpdate.id }, JugadorToUpdate.Saldo),
    ])
    .then(function() {
      deferred.resolve(JugadorToUpdate)
    })
    .catch(function(error) {
      deferred.reject(error);
    })
     
    
    return deferred.promise;
        
}


