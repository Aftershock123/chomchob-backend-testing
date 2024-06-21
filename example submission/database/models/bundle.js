module.exports = (sequelize, DataTypes) => {
    const Bundle = sequelize.define('Bundle', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: true
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    });
    Bundle.associate = models => {
      Bundle.hasMany(models.Item, { foreignKey: 'bundleId' });
    };
    return Bundle;
  };
  