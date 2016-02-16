module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Jugadores',
    { username: {
        type: DataTypes.STRING,
        unique: true,
        validate: { notEmpty: {msg: "-> Falta login"}}
      },
       password: { type: DataTypes.STRING },
        Nombre: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Nombre"}} 
      },
       IdEstado : {
        type: DataTypes.INTEGER
      },
       CorreoExterno : {
        type: DataTypes.STRING
      },
      
        IdRol : {
        type: DataTypes.INTEGER
      }
      
    }
  );
}