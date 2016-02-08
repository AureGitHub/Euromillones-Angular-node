var Q = require("q");
var path = require('path');
var utils = require('../utils/utils.js');
var DatosPreCarga = require('../utils/datosPreCarga.js');
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, {
  dialect: "sqlite",
  storage: "app/LocalBD/miBD.sqlite"
});




var Apuestas = sequelize.import(path.join(__dirname, 'Apuestas'));
var Jugadores = sequelize.import(path.join(__dirname, 'Jugadores'));
var TiposEstadosApuesta = sequelize.import(path.join(__dirname, 'TiposEstadosApuesta'));
var TiposEstadosJugador = sequelize.import(path.join(__dirname, 'TiposEstadosJugador'));
var TiposRoles = sequelize.import(path.join(__dirname, 'TiposRoles'));







//REL APUESTAS x ESTADO
Apuestas.belongsTo(TiposEstadosApuesta, {
  foreignKey: 'IdEstado'
});

//REL JUGADORES x TiposRoles
Jugadores.belongsTo(TiposRoles, {
  foreignKey: 'IdRol'
});

//REL JUGADORES x Tipo EstadoUsuario
Jugadores.belongsTo(TiposEstadosJugador, {
  foreignKey: 'IdEstado'
});


exports.Jugadores = Jugadores;
exports.TiposRoles = TiposRoles;

exports.TiposEstadosJugador = TiposEstadosJugador;

exports.TiposEstadosApuesta = TiposEstadosApuesta;


var CrearLosTipos = function() {

  var deferred = Q.defer();

  Q.all([
      utils.CrearTabla(TiposEstadosJugador, DatosPreCarga.TiposEstadosJugador),
      utils.CrearTabla(TiposEstadosApuesta, DatosPreCarga.TiposEstadosApuesta),
      utils.CrearTabla(TiposRoles, DatosPreCarga.TiposRoles)
    ])
    .then(function() {
      deferred.resolve();
    })
    .catch(function(error) {
      deferred.reject(error);
    })

  return deferred.promise;

}


sequelize.sync().then(function() {

    CrearLosTipos().then(function() {
      console.log('Tipos creados.............');
      utils.CrearTabla(Apuestas, DatosPreCarga.Apuestas).then(function() {
        console.log('Apuestas creadas.............');
      });
      utils.CrearTabla(Jugadores, DatosPreCarga.Jugadores).then(function() {
        console.log('Jugadores creados.............');
      });
    });

  })
  .catch(function(error) {
    console.log('no se ha podido crear la BD. Motivo : ' + error);
  });