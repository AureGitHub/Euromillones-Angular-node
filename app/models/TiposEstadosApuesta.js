module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'TiposEstadosApuesta',
    {
      descripcion : {
        type: DataTypes.STRING  
      }
    }
  );
}