module.exports = (sequelize, DataTypes) => {
    const Code = sequelize.define('Code', {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      saleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
    Code.associate = models => {
      Code.belongsTo(models.Sale, { foreignKey: 'saleId' });
    };
    return Code;
  };
  