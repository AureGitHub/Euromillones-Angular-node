var path = require('path');

var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
  { dialect: "sqlite", storage: "miBD.sqlite" }
  );


var DatosPreCarga = require('./datosPreCarga.js');


var Jugadores = sequelize.import(path.join(__dirname, 'jugadores'));
var TiposRol = sequelize.import(path.join(__dirname, 'tiposRol'));

exports.Jugadores = Jugadores;
exports.TiposRol = TiposRol;

sequelize.sync().then(function () {


  Jugadores.count().then(function (count) {
    if (count === 0) {   // la tabla se inicializa solo si está vacía
      Jugadores.bulkCreate(
        DatosPreCarga.JUGADORES
        ).then(function () {
          console.log('<<Jugadores>> inicializada');
        });
    }
    else{
      console.log('<<Jugadores>> contiene ' + count + ' elementos');
    }

  });
  
  
  TiposRol.count().then(function (count) {
    if (count === 0) {   // la tabla se inicializa solo si está vacía
      TiposRol.bulkCreate(
        DatosPreCarga.ROLES
        ).then(function () {
          console.log('<<Roles>> inicializada');
        });
    }
    else{
      console.log('<<Roles>> contiene ' + count + ' elementos');
    }

  });
  

});