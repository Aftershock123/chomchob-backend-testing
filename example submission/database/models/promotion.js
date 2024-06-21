module.exports = (sequelize, DataTypes) => {
    const Promotion = sequelize.define('Promotion', {
      discountPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
    Promotion.associate = models => {
      Promotion.belongsTo(models.Item, { foreignKey: 'itemId' });
    };
    return Promotion;
  };
  