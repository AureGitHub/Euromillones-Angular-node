
var models = require('../models/models.js');
var utils = require('../utils/utils.js');



var update = function  (Tabla,req, res, next){
     utils.Update(Tabla,{ id: req.body.id }, req.body)
        .then(function(dato){
             res.data = dato;
             next();
        }).catch(function(error){
             next(error);
        });
}


var get = function  (Tabla,req, res, next){
     try{
        utils.GetData(Tabla,null,req, res, next);    
    }
    catch(error){
        next(error);
    }
}

exports.get = get;
exports.update = update;



exports.getRolesAll = function (req, res, next) {
    get('TiposRoles',req, res, next);
}


exports.RolUpdate = function (req, res, next) {
   update('TiposRoles',req, res, next);
}


exports.TiposEstadosJugadorAll = function (req, res, next) {
     get('TiposEstadosJugador',req, res, next);
}


exports.TiposEstadosJugadorUpdate = function (req, res, next) {

     update('TiposEstadosJugador',req, res, next);
}



exports.TiposEstadosApuestaAll = function (req, res, next) {
     get('TiposEstadosApuesta',req, res, next);
}


exports.TiposEstadosApuestaUpdate = function (req, res, next) {
    update('TiposEstadosApuesta',req, res, next);
}
