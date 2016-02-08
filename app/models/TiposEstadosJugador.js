module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'TiposEstadosJugador',
    {
      descripcion : {
        type: DataTypes.STRING  
      }
    }
  );
}