var Q = require("q");

var path = require('path');

var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, {
  dialect: "sqlite",
  storage: "miBD.sqlite"
});


var utils = require('../controllers/utils.js');

var DatosPreCarga = require('./datosPreCarga.js');


var Jugadores = sequelize.import(path.join(__dirname, 'jugadores'));
var TiposRol = sequelize.import(path.join(__dirname, 'tiposRol'));

var Tipo_Estado = sequelize.import(path.join(__dirname, 'tipo_estado'));
var TiposUsuarioEstado = sequelize.import(path.join(__dirname, 'tipo_usuarioEstado'));
var Apuestas = sequelize.import(path.join(__dirname, 'apuestas'));



//REL APUESTAS x ESTADO
Apuestas.belongsTo(Tipo_Estado, {
  foreignKey: 'IdEstado'
});

//REL JUGADORES x TiposRol
Jugadores.belongsTo(TiposRol, {
  foreignKey: 'IdRol'
});

//REL JUGADORES x Tipo EstadoUsuario
Jugadores.belongsTo(TiposUsuarioEstado, {
  foreignKey: 'IdEstado'
});


exports.Jugadores = Jugadores;
exports.TiposRol = TiposRol;

exports.TiposUsuarioEstado = TiposUsuarioEstado;


var CrearLosTipos = function () {

  var deferred = Q.defer();

  utils.CrearTabla(TiposUsuarioEstado, DatosPreCarga.TiposUsuarioEstado).then(function() {
    utils.CrearTabla(Tipo_Estado, DatosPreCarga.TIPO_ESTADO).then(function() {
      utils.CrearTabla(TiposRol, DatosPreCarga.ROLES).then(function() {
        deferred.resolve();
      });
    });
  });

  return deferred.promise;

}


sequelize.sync().then(function() {

  CrearLosTipos().then(function() {
    console.log('Tipos creados.............');
    utils.CrearTabla(Apuestas, DatosPreCarga.Apuestas).then(function() {
      console.log('Apuestas creadas.............');
    });
    utils.CrearTabla(Jugadores, DatosPreCarga.JUGADORES).then(function() {
      console.log('Jugadores creados.............');
    });
  });

})
.catch(function(error){
  console.log('no se ha podido crear la BD. Motivo : ' + error);
})
;