
var models = require('../models/models.js');

var utils = require('../utils/utils.js');




exports.getRolesAll = function (req, res, next) {
    try{
        utils.GetData(models.TiposRoles,null,req, res, next);    
    }
    catch(error){
        next(error);
    }
}


exports.RolUpdate = function (req, res, next) {

    var updateRol = req.body;
    
    utils.Update('TiposRoles',{ id: updateRol.id }, updateRol)
        .then(function(dato){
             res.data = dato;
             next();
        }).catch(function(error){
             next(error);
        });

}