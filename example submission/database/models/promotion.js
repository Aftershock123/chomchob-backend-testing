module.exports = (sequelize,Sequelize) => {
  const Promotion = sequelize.define('Promotion', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    itemId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Items',
        key: 'id'
      }
    },
    startDate:{ 
      type:Sequelize.DATE,
      allowNull: false

    },

    endDate:{
      type: Sequelize.DATE,
      allowNull: false

    },
    discountedPrice: {
      type:Sequelize.FLOAT,
      allowNull: false
    }
  });
    return Promotion;
  };
  