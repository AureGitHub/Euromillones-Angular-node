module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Saldos',
    {
      id   : {type:DataTypes.INTEGER, primaryKey: true,autoIncrement: false},
      saldo : {
        type: DataTypes.REAL  
      }
    }
  );
}