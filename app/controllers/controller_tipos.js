
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