module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Movimientos',
    {
      id   : {type:DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
      idJugador   : {type:DataTypes.INTEGER},
      idApuesta   : {type:DataTypes.INTEGER},
      idTipoMovimiento   : {type:DataTypes.INTEGER},
      cantidad : {type: DataTypes.REAL }
    }
  );
}