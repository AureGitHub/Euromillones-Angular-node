module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Apuestas',
    {
      nombre : {
        type: DataTypes.STRING  
      },
       apostado : {
        type: DataTypes.INTEGER  
      },
       ganado : {
        type: DataTypes.INTEGER  
      },
        IdEstado : {
        type: DataTypes.INTEGER  
      },
      
    }
  );
}