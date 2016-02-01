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












// ****** ADMIN ******************


/*

router.use('/user/authenticate',controller_user.authenticate);
router.use('/user/signin',controller_user.signin);



// GET de todos los miTabla
router.get('/api/todos', function(req, res) {  
  
  models.MiTabla.all().then(function(todos) {
    res.json(todos);
  })
  
});

// POST que crea un miTabla y devuelve todos tras la creación
router.post('/api/todos', function(req, res) {  
  
   models.MiTabla.build(
      { texto: req.body.text}
      )
      .save()
      .then(function(){
         models.MiTabla.all().then(function(todos) {
          res.json(todos);
        });
      });
   
});

router.delete('/api/todos/:id', function(req, res) {  
  
   models.MiTabla.find({
             where: {
                 id: Number(req.params.id)
             }
         }).then(function(elementoMiTabla) {
             if (elementoMiTabla) {
               elementoMiTabla.destroy().then( function() {
                   
                    models.MiTabla.all().then(function(todos) {
                    res.json(todos);
                     });
                 
               });
             } else{res.send('error borrando')}
        }
   ).catch(function(error){res.send('error borrando ' +error )});
});





router.post('/authenticate', function(req, res) {

 models.User.find({
             where: {email: req.body.email, password: req.body.password}
         }).then(function(user) {
             if (user) {
               res.json({
                    type: true,
                    data: user,
                    token: user.token
                }); 
             } else{ 
                 res.json({ type: false,data: "Incorrect email/password"});    
                 
             }
        }
   ).catch(function(error){res.json({ type: false,data: "Incorrect email/password"})});
    
    

});



router.post('/signin', function(req, res) {
    
    
     models.User.find({
             where: {email: req.body.email, password: req.body.password}
         }).then(function(user) {
             if (user) {
              res.json({
                    type: false,
                    data: "User already exists!"
                });
             } else{ 
                 models.User.build(
                         {  nombre: req.body.nombre, 
                            email : req.body.email ,
                            password :req.body.password,
                            }                        
                    )
                    .save()
                    .then(function(userNew){
                        userNew.token = jwt.sign(user, process.env.JWT_SECRET);
                        userNew.save(function(userReturn){
                           res.json({
                            type: true,
                            data: userReturn,
                            token: userReturn.token
                        }); 
                        });
                        
                    });
                 
             }
        }
   ).catch(function(error){ res.json({
                type: false,
                data: "Error occured: " + error
            });});
    

});


router.get('/me', ensureAuthorized, function(req, res) {
User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
});
*/




 module.exports = router;

