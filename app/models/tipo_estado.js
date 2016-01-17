module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Tipo_Estado',
    {
      descripcion : {
        type: DataTypes.STRING  
      }
    }
  );
}