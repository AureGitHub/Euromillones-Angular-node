
var models = require('../models/models.js');

function Ejecuta(Tabla,req, res, next)
{
     Tabla.findAll().then(function (dato) {
        res.data = dato;
        next();
    })
    .catch(function (error) {
        next(error);
        });
}

exports.getRolesAll = function (req, res, next) {

    Ejecuta(models.TiposRol,req, res, next);
    
}


exports.RolUpdate = function (req, res) {

    var updateRol = req.body;
    var id = req.params.id;


    models.TiposRol.find({
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
        });

}