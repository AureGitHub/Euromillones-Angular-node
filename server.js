//server.js

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var morgan = require("morgan");


// Configuración
app.configure(function () {  
    // Localización de los ficheros estÃ¡ticos
    app.use(express.static(__dirname + '/public'));
    // Muestra un log de todos los request en la consola        
    app.use(express.logger('dev')); 
    // Permite cambiar el HTML con el método POST                   
    app.use(express.bodyParser());
    // Simula DELETE y PUT                      
    app.use(express.methodOverride());
});


var route = require('./app/routes/index');

var validateRequest = require('./app/controllers/controller_user').validateRequest;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


app.all('/api/private/*', [validateRequest]);
app.all('/api/admin/*', [validateRequest]);


/*
app.use('/me',secure);
app.use('/authenticate',secure);
app.use('/signin',secure);
*/
app.use('/', route);


// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.json({
        "status": 404,
        "message": "Página no encontrada"
    });
});


// Escucha en el puerto 8080 y corre el server
app.listen(process.env.PORT || 51098, function () {
    console.log('App listening on port ' + process.env.PORT || 51098);
});
