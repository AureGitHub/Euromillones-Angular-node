module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'TiposMovimientos',
    {  
      descripcion: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Nombre"}} 
      }
      
    }
  );
}