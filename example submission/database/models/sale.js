module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
    Sale.associate = models => {
      Sale.belongsTo(models.Item, { foreignKey: 'itemId' });
    };
    return Sale;
  };
  