var express =  require('express');
var router = express();



var controller_user = require('../controllers/controller_user');
var controller_products = require('../controllers/controller_products');
var controller_tipos = require('../controllers/controller_tipos');


var models = require('../models/models');


router.post('/login', controller_user.login);


router.get('/api/private/products', controller_products.getAll);



router.get('/api/private/product/:id', controller_products.getOne);
router.post('/api/private/product/', controller_products.create);
router.put('/api/private/product/:id', controller_products.update);

router.put('/api/private/user/:id', controller_user.updateUser);


router.delete('/api/private/product/:id', controller_products.delete);


// ****** ADMIN ******************

router.get('/api/admin/UserList', controller_user.getAll);
router.put('/api/admin/user/:id', controller_user.updateUserForAdmin);
router.delete('/api/admin/user/:id', controller_user.delete);
router.post('/api/admin/user', controller_user.create);

//++++++++++++ Tipos

router.get('/api/admin/RolList', controller_tipos.getRolesAll);
router.put('/api/admin/RolUpdate/:id', controller_tipos.RolUpdate);


router.get('/api/admin/EstadoApuestaList', controller_tipos.TiposEstadosApuestaAll);
router.put('/api/admin/EstadoApuestaUpdate/:id', controller_tipos.TiposEstadosApuestaUpdate);

router.get('/api/admin/EstadoJugadoresList', controller_tipos.TiposEstadosJugadorAll);
router.put('/api/admin/EstadoJugadoresUpdate/:id', controller_tipos.TiposEstadosJugadorUpdate);



function finalizar (req, res, next) {
    
    var dato = res.data;
    res.data = null;
    
     res.json({
            data: dato,
            Security: req.tokenRefresh,

        });
}

exports.MWError  = function MError (error,req, res, next) {
    
    logger.fatal(error);
    
     res.status(500);
            res.json({
                "status": 500,
                "message": error
            });
}


router.all('/api/admin/*', finalizar);





 module.exports = router;

