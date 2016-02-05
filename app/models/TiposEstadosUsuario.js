module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'TiposEstadosUsuario',
    {
      descripcion : {
        type: DataTypes.STRING  
      }
    }
  );
}