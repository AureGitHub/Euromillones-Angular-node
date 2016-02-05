module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'TiposRoles',
    {  
      descripcion: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Nombre"}} 
      }
      
    }
  );
}