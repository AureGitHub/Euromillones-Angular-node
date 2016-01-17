var path = require('path');

var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
  { dialect: "sqlite", storage: "miBD.sqlite" }
  );


var DatosPreCarga = require('./datosPreCarga.js');


var Jugadores = sequelize.import(path.join(__dirname, 'jugadores'));
var TiposRol = sequelize.import(path.join(__dirname, 'tiposRol'));

var Tipo_Estado = sequelize.import(path.join(__dirname, 'tipo_estado'));
var Apuestas = sequelize.import(path.join(__dirname, 'apuestas'));



//REL APUESTAS x ESTADO
Apuestas.belongsTo(Tipo_Estado, { foreignKey: 'IdEstado' });

//REL JUGADORES x TiposRol
Jugadores.belongsTo(TiposRol, { foreignKey: 'role' });

exports.Jugadores = Jugadores;
exports.TiposRol = TiposRol;

sequelize.sync().then(function () {



 Tipo_Estado.count().then(function (count) {
    if (count === 0) {   // la tabla se inicializa solo si está vacía
      Tipo_Estado.bulkCreate(
        DatosPreCarga.TIPO_ESTADO
        ).then(function () {
          console.log('<<TIPO_ESTADO>> inicializada');
          
          
            Apuestas.count().then(function (count) {
            if (count === 0) {   // la tabla se inicializa solo si está vacía
              Apuestas.bulkCreate(
                [
                  { nombre: 'Apuesta1', apostado: 100, ganado: 200, IdEstado: 1 },
        
        
                ]
                )
                .then(function () { console.log('Base de datos Apuestas inicializada') });
            }
          });
          
        });
    }
    else{
      console.log('<<Roles>> contiene ' + count + ' elementos');
    }

  });

  
  
  
  TiposRol.count().then(function (count) {
    if (count === 0) {   // la tabla se inicializa solo si está vacía
      TiposRol.bulkCreate(
        DatosPreCarga.ROLES
        ).then(function () {
          console.log('<<Roles>> inicializada');
          
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
        });
    }
    else{
      console.log('<<Roles>> contiene ' + count + ' elementos');
    }

  });
  

});