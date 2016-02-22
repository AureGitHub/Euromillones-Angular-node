var express =  require('express');
var router = express();



var controller_user = require('../controllers/controller_user');
var controller_Jugadores = require('../controllers/controller_Jugadores');



var models = require('../models/models');
var utils = require('../utils/utils.js');

router.post('/login', controller_user.login);



router.get('/api/admin/*', function(req,res,next){
    var arr = req.url.toString().split("/");
    var Tabla=arr[arr.length - 1];
   
    utils.get(Tabla,null,true).then(function(dato){
         res.data = dato;
         next();
    }).catch(function(error){
         next(error);
    });
    
});


router.post('/api/admin/*', function(req,res,next){
    var arr = req.url.toString().split("/");
    var Tabla=arr[arr.length - 1];
    utils.create(Tabla,req.body)
    .then(function(dato){
             res.data = dato.dataValues;
             next();
        }).catch(function(error){
             next(error);
        });
});


router.put('/api/admin/TiposEstadosApuesta | TiposEstadosJugador | TiposRoles /:id', function(req,res,next){
    var arr = req.url.toString().split("/");
    var Tabla=arr[arr.length - 2];
    utils.update(Tabla,{ id: req.body.id }, req.body).
    then(function(dato){
             res.data = dato.dataValues;
             next();
        }).catch(function(error){
             next(error);
        });
});


router.put('/api/admin/Jugadores/:id', function(req,res,next){
    var arr = req.url.toString().split("/");
    var Tabla=arr[arr.length - 2];
    
    controller_Jugadores.update(Tabla,req.body).
    then(function(dato){
             res.data = dato;
             next();
        }).catch(function(error){
             next(error);
        });
});



router.put('/api/private/Jugadores/:id', function(req,res,next){
    var arr = req.url.toString().split("/");
    var Tabla=arr[arr.length - 2];
    utils.update(Tabla,{ id: req.body.id }, req.body,'JugadoresNoAdmin').
    then(function(dato){
             res.data = dato.dataValues;
             req.tokenRefresh = controller_user.genToken(dato.dataValues);
             next();
        }).catch(function(error){
             next(error);
        });
});



router.delete('/api/admin/Jugadores/:id', function(req,res,next){
    var arr = req.url.toString().split("/");
    var Tabla=arr[arr.length - 2];
    utils.delete(Tabla,req.body.id).
    then(function(dato){
             res.data = dato.dataValues;
             next();
        }).catch(function(error){
             next(error);
        });
});


function finalizar (req, res, next) {
    
    var dato = res.data;
    res.data = null;
    
     res.json({
            data: dato,
            Security: req.tokenRefresh,

        });
}






router.all('/api/admin|private/*', finalizar);





 module.exports = router;

