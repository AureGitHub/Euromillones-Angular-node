
var models = require('../models/models.js');

var utils = require('./utils.js');


exports.getRolesAll = function (req, res, next) {
    try{
        utils.GetData(models.TiposRol,null,req, res, next);    
    }
    catch(error){
        next(error);
    }
    
}


exports.RolUpdate = function (req, res, next) {

    var updateRol = req.body;
    var id = req.params.id;

    
    var updatePropio=function(rol,updateRol)
    {
         rol.descripcion = updateRol.descripcion;
    }
   
    utils.Update(models.TiposRol,{ id: id },updatePropio,updateRol)
        .then(function(dato){
             res.data = dato;
             next();
        }).catch(function(error){
             next(error);
        });
        
       

/*    models.TiposRol.find({
        where: { id: id }
    }).then(function (rol) {
        if (rol) {
            
            rol.descripcion = updateRol.descripcion;

            rol.save().then(function () {
                res.json({
                    data: 'OK',
                    Security: req.tokenRefresh,
                });
            });

        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;

        }
    }
        ).catch(function (error) {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        });*/

}