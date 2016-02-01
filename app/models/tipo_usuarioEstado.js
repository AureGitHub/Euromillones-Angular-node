module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Tipo_UsuarioEstado',
    {
      descripcion : {
        type: DataTypes.STRING  
      }
    }
  );
}