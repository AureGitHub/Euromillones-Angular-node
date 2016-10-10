var express =  require('express');
var router = express();



var controller_user = require('../controllers/controller_user');
var controller_Jugadores = require('../controllers/controller_Jugadores');



var models = require('../models/models');
var utils = require('../utils/utils.js');

router.post('/login', controller_user.login);


router.get('/api/private/Refresh', function(req,res,next){
    next();
    
});







router.get('/api/admin/:type(Jugadores|Saldos|TiposRoles|TiposEstadosApuesta|TiposEstadosJugador|TiposMovimientos)', function(req,res,next){
    var arr = req.url.toString().split("/");
    var Tabla=arr[arr.length - 1];
   
    utils.get(Tabla,null,true).then(function(dato){
         res.data = dato;
         next();
    }).catch(function(error){
         next(error);
    });
    
});



router.get('/api/private/Movimientos/:id', function(req,res,next){
    var arr = req.url.toString().split("/");
    var Tabla=arr[arr.length - 2];
    
     var idJugador =arr[arr.length - 1];
    
   
    utils.get(Tabla,{ idJugador: idJugador },true).then(function(dato){
         res.data = dato;
         next();
    }).catch(function(error){
         next(error);
    });
    
});





router.post('/api/admin/:type(Saldos|TiposRoles|TiposEstadosApuesta|TiposEstadosJugador|TiposMovimientos)', function(req,res,next){
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

router.post('/api/admin/Jugadores', function(req,res,next){
    var arr = req.url.toString().split("/");
    var Tabla=arr[arr.length - 1];
    
    
     controller_Jugadores.create(Tabla,req.body).
    then(function(dato){
             res.data = dato;
             next();
        }).catch(function(error){
             next(error);
        });
});




//app.get('/:type(discussion|page)/:id', ...)
//router.put('/api/admin/ + (TiposEstadosApuesta | Saldos | TiposEstadosJugador | TiposRoles) /:id', function(req,res,next){
router.put('/api/admin/:type(Saldos|TiposRoles|TiposEstadosApuesta|TiposEstadosJugador|TiposMovimientos)/:id', function(req,res,next){
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


router.delete('/api/admin/:type(Saldos|TiposRoles|TiposEstadosApuesta|TiposEstadosJugador|TiposMovimientos)/:id', function(req,res,next){
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
    
    var userInClient = req.userInClient;
    
      utils.get(utils.TABLAS.JUGADORES, { id: userInClient.id },true)
            .then(function (user) {
                res.json({
                    data: dato,
                    Security: controller_user.genToken(user[0])
                });
            });
     
}






router.all('/api/admin|private/*', finalizar);





 module.exports = router;

