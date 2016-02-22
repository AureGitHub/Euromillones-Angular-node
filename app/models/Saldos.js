module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Saldos',
    {
      saldo : {
        type: DataTypes.REAL  
      }
    }
  );
}