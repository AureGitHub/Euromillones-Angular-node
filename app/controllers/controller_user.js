var models = require('../models/models.js');
var jwt = require("jwt-simple");
var utils = require('../utils/utils.js');


var constants = require('../constant.js');


var Roles = {
    ADMIN: 1,
    USUARIO: 2
};



exports.validateRequest = function (req, res, next) {
    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe. 
 
    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();
 
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    

    if (token) {
        try {
            var decoded = jwt.decode(token, constants.JWT_SECRET);
            var userInClient = decoded.user;
            if (decoded.exp <= Date.now()) {
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Token de seguridad ha expirado"
                });
                return;
            }
            
            if (userInClient) {
                if (
                    req.url.indexOf('/api/admin/') >= 0 && userInClient.IdRol == Roles.ADMIN  //Acceso de Admin
                    ||
                    (req.url.indexOf('/api/private/') >= 0 && (userInClient.IdRol == Roles.ADMIN || userInClient.IdRol == Roles.USUARIO))
                    ) 
                    {
                        req.userInClient = userInClient;
                        next(); //Todo OK. Pasa al siguiente  middleware
                    }
                      
                else {
                    next(new Error("No está autorizado para realizar esta operación"));
                }

            } 
            else {
                 next(new Error("Usuario / Password Incorrecto"));
                return;
            }
            
            
            /*
 
            // Authorize the user to see if s/he can access our resources
 
            utils.get(utils.TABLAS.JUGADORES, { id: userInClient.id },true)
            .then(function (dbUsers) {
                var dbUser=dbUsers[0];
                if (dbUser) {
                    if (
                        req.url.indexOf('/api/admin/') >= 0 && dbUser.IdRol == Roles.ADMIN  //Acceso de Admin
                        ||
                        (req.url.indexOf('/api/private/') >= 0 && (dbUser.IdRol == Roles.ADMIN || dbUser.IdRol == Roles.USUARIO))
                        ) {

                        req.tokenRefresh = genToken(dbUser);

                        next(); //Todo OK. Pasa al siguiente  middleware
                    }
                    else {
                        res.status(403);
                        res.json({
                            "status": 403,
                            "message": "No está autorizado para realizar esta operación"
                        });
                    }

                    return;


                } else {
                    // No user with this name exists, respond back with a 401
                    res.status(401);
                    res.json({
                        "message": "Usuario / Password Incorrecto"
                    });
                    return;
                }
            }
                ).catch(function (err) {
                    res.status(500);
                    res.json({
                        "status": 500,
                        "message": err,
                        "error": err
                    });

                });


*/

        } catch (err) {
            next(err);
        }



    } else {
         next(new Error("Token de seguridad inválido"));
        return;
    }
}


exports.login = function (req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Credenciales incorrectas"
        });
        return;
    }


    utils.get(utils.TABLAS.JUGADORES, { username: username, password: password },true)
   .then(function (user) {
        if (user[0]) {
            res.status(200);
            res.json({
                Security: genToken(user[0]),
            });
        } else {
            res.status(401);
            res.json({
                "message": "Usuario / Password Incorrecto"
            });
            return;

        }
    }
        ).catch(function (error) {
            res.status(500);
            res.json({
                "message": error
            });
            return;
        });



}



exports.create = function (req, res) {

    var createUser = req.body;

    models.Jugadores.bulkCreate(
        [
            {

                username: createUser.username,
                password: createUser.password,
                Nombre: createUser.Nombre,
                activo: 1,
                CorreoExterno: createUser.CorreoExterno,
                IdRol: createUser.IdRol
            }
        ]).then(function () {
            res.json({
                data: 'OK',
                Security: req.tokenRefresh,
            });
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



var genToken=function (user) {
    var expires = expiresIn(15); // Minutos de session
  
 
    var token = jwt.encode({
        exp: expires,
        user: user
    }, constants.JWT_SECRET);

    return {
        token: token,
        expires: expires,
        user: user
    };
}


exports.genToken = genToken;


function expiresIn(numMin) {
    var dateObj = new Date();
    return dateObj.setMinutes(dateObj.getMinutes() + numMin);
}