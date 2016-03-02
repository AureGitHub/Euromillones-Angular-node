module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Movimientos',
    {
      id   : {type:DataTypes.INTEGER, primaryKey: true},
      idJugador   : {type:DataTypes.INTEGER},
      idTipoMovimiento   : {type:DataTypes.INTEGER},
      cantidad : {type: DataTypes.REAL }
    }
  );
}