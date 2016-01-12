
var models = require('../models/models.js');

exports.getRolesAll = function (req, res) {

    models.TiposRol.findAll().then(function (Rol) {
        res.json({
            data: Rol,
            Security: req.tokenRefresh,

        });
    }
        );
}


exports.RolUpdate = function (req, res) {

    var updateRol = req.body;
    var id = req.params.id;


    models.TiposRol.find({
        where: { id: id }
    }).then(function (rol) {
        if (rol) {

            rol.Codigo = updateRol.Codigo;
            rol.Nombre = updateRol.Name;
           

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