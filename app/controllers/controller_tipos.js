
var models = require('../models/models.js');

exports.getRolesAll = function (req, res, next) {

    models.TiposRol.findAll().then(function (Rol) {
        res.data = Rol;
        next(Rol);
    });
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