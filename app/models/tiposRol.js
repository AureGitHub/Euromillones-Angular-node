module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'TiposRoles',
    { Codigo: {
        type: DataTypes.INTEGER,
        validate: { notEmpty: {msg: "-> Id obligatorio"}}
      },
       
      Name: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Nombre"}} 
    }
      
    }
  );
}