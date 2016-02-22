module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Jugadores',
    { username: {
        type: DataTypes.STRING,
        unique: true,
        validate: { notEmpty: {msg: "-> Falta login"}}
      },
       password: { 
           type: DataTypes.STRING ,
           validate: { 
            notEmpty: {msg: "-> Falta password"},
            len: [8,10] 
        } 
       },
        Nombre: {
        type: DataTypes.STRING,
        validate: { 
            notEmpty: {msg: "-> Falta Nombre"},
        } 
      },
       IdEstado : {
        type: DataTypes.INTEGER
      },
       CorreoExterno : {
        type: DataTypes.STRING,
        validate: { 
            notEmpty: {msg: "-> Falta CorreoExterno"},
            isEmail: true
        } 
      },
      
        IdRol : {
        type: DataTypes.INTEGER
      }
      
    }
  );
}