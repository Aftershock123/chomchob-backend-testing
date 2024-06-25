module.exports = (sequelize,Sequelize) => {
    const Purchase = sequelize.define('Purchase', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        itemId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Items',
            key: 'id'
          }
        },
      purchaseDate: {
        type:Sequelize.DATE,
        allowNull: false
        },
      price: {
          type:Sequelize.FLOAT,
          allowNull: false
        }
      });
      return Purchase;
    };
    


