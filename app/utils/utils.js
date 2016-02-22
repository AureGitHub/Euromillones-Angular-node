var Q = require("q");

var updatePropio = require('../utils/updatePropio.js');
var inclidePropio = require('../utils/inclidePropio.js');
var models = require('../models/models.js');


exports.TABLAS = {
    TIPOSROLES: 'TiposRoles',
    APUESTAS: 'Apuestas',
    JUGADORES: 'Jugadores',
    TIPOSESTADOSAPUESTA: 'TiposEstadosApuesta',
    TIPOSUSUARIOESTADO: 'TiposUsuarioEstado',
    SALDOS : 'Saldos'
    
};


var FormateaError=function(error,item)
{
    var salReturn = 'No controlado :' + error.name + ' ' + error.message;
    
    if(error.name=='SequelizeUniqueConstraintError')
    {
        var fieldDuplicate = '';
        error.fields.forEach(function(field) {
            fieldDuplicate+=item[field] + ' ';
        });
            
        salReturn= 'Duplicado (' +  fieldDuplicate + ')';
        //salReturn= 'Duplicado (' +  error.fields.join() + ')';
    }
    
    return salReturn;
   
}


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


var get = function(Tabla, where,include) {

    var deferred = Q.defer();
    
    
    var GetInclude = null;
    
    
    
    if(include)
    {
        if(inclidePropio[Tabla])
        {
            if(inclidePropio[Tabla].length==1){
                GetInclude= { model: models[inclidePropio[Tabla][0]] , required: false };
            }
            else{
                 GetInclude=[];
                 inclidePropio[Tabla].forEach(function(t){
                     GetInclude.push({model: models[t] , required: false});
                 })
                 
            }
        }
    }
    
    
    models[Tabla].findAll({
            where: where,
            include : GetInclude
        }).then(function(dato) {
            deferred.resolve(dato);
        }).catch(function(error) {
            deferred.reject(error);
        });
        
    return deferred.promise;
}


exports.get = get;

var create = function(Tabla, itemToCreated) {
   var deferred = Q.defer();
   
    models[Tabla].create(itemToCreated)
        .then(function (itemCreated) {
             get(Tabla,{id :itemCreated.id },true).then(function(item) {
                deferred.resolve(item[0]);      
             })
        })
        .catch(function (error) {
           deferred.reject(FormateaError(error,itemToCreated));
        });

    return deferred.promise;

}


exports.update = function(Tabla, where,itemUpdated,extraUpdatePropio) {
    var deferred = Q.defer();
    
    if(!extraUpdatePropio) // Si no se especifica ninguno propio, se utiliza el basico para cada tabla
        extraUpdatePropio=models[Tabla].name;
        
    get(Tabla,where,true)
        .then(function(item){
             if (item[0]) {
                updatePropio[extraUpdatePropio](item[0], itemUpdated);
                item[0].save().then(function() {
                    deferred.resolve(item[0]);
                })
                .catch(function(error) {
                deferred.reject(FormateaError(error,itemUpdated));
                });;
            }
            else {
                //Lo creo OJO!!!!!!!!
                create(Tabla,itemUpdated).then(
                    function(item) {
                        deferred.resolve(item);
                    }
                    ) .catch(function(error) {
            deferred.reject(FormateaError(error));
        });
                
                
            }
        })
        .catch(function(error) {
            deferred.reject(FormateaError(error));
        });
   

    return deferred.promise;

}



exports.delete = function (Tabla, id) {

 var deferred = Q.defer();
        
    get(Tabla,{ id: id },null)
        .then(function(item){
             if (item[0]) {
                
                item[0].destroy().then(function() {
                    deferred.resolve(item[0]);
                });
            }
            else {
                deferred.reject('No se ha encontrado el objeto');
            }
        })
        .catch(function(error) {
            deferred.reject(error);
        });
        
    return deferred.promise;

}




exports.create = create;





