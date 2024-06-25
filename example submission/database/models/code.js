module.exports = (sequelize,Sequelize) => {
  const Code = sequelize.define('Code', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    purchaseId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Purchases',
        key: 'id'
      }
    },
    code:{ 
      type: Sequelize.STRING,
      allowNull: false
    } 
  });
    return Code;
  };
  