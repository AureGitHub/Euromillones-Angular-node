module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Jugadores',
    { username: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta login"}}
      },
       password: { type: DataTypes.STRING },
      Nombre: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Nombre"}} 
      },
       activo : {
        type: DataTypes.BOOLEAN
      },
       CorreoExterno : {
        type: DataTypes.STRING
      },
      
        role : {
        type: DataTypes.STRING
      }
      
    }
  );
}