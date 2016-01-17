var models = require('../models/models.js');
var jwt = require("jwt-simple");



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
    //var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

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
 
            // Authorize the user to see if s/he can access our resources
 
 
            models.Jugadores.find({
                where: { username: userInClient.username }
            }).then(function (dbUser) {
                if (dbUser) {

                    if (
                        req.url.indexOf('/api/admin/') >= 0 && dbUser.role == Roles.ADMIN  //Acceso de Admin
                        ||
                        (req.url.indexOf('/api/private/') >= 0 && (dbUser.role == Roles.ADMIN || dbUser.role == Roles.USUARIO))
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




        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": err,
                "error": err
            });
        }



    } else {
        res.status(400);
        res.json({
            "status": 400,
            "message": "Token de seguridad inválido"
        });
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


    models.Jugadores.find({
        where: { username: username, password: password }
    }).then(function (user) {
        if (user) {
             res.status(200);
             res.json({
                    Security: genToken(user),
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
            res.status(500 );
            res.json({
                "message": error
            });
            return;
        });



}



exports.getAll = function (req, res) {

    models.Jugadores.findAll({
         include:  { model: models.TiposRol, required: true}
    }).then(function (usuarios) {
        res.json({
            data: usuarios,
            Security: req.tokenRefresh,

        });
    }
        );
}


exports.updateUser = function (req, res) {

    var updateUser = req.body;
    var id = req.params.id;


    models.Jugadores.find({
        where: { id: id }
    }).then(function (jugador) {
        if (jugador) {

            jugador.username = updateUser.username;
            jugador.Nombre = updateUser.Nombre;
            jugador.password = updateUser.password;
            jugador.CorreoExterno = updateUser.CorreoExterno;

            jugador.save().then(function () {
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


exports.updateUserForAdmin = function (req, res) {

    var updateUser = req.body;
    var id = req.params.id;


    models.Jugadores.find({
        where: { id: id }
    }).then(function (jugador) {
        if (jugador) {

            jugador.username = updateUser.username;
            jugador.Nombre = updateUser.Nombre;
            jugador.password = updateUser.password;
            jugador.CorreoExterno = updateUser.CorreoExterno;
            jugador.activo = updateUser.activo;
            jugador.role = updateUser.role;


            jugador.save().then(function () {
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
                role: createUser.role
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


exports.delete = function (req, res) {

    var id = req.params.id;

    models.Jugadores.find({
        where: { id: id }
  
    }).then(function (jugador) {
        if (jugador) {

            jugador.destroy().then(function () {
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





function genToken(user) {
    var expires = expiresIn(15); // Minutos de session
  
 
    var token = jwt.encode({
        exp: expires,
        user: user
    }, constants.JWT_SECRET);

    return {
        token: token,
        expires: expires,
        user:user
    };
}

function expiresIn(numMin) {
    var dateObj = new Date();
    return dateObj.setMinutes(dateObj.getMinutes() + numMin);
}