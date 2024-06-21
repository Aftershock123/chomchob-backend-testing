module.exports = (sequelize, DataTypes) => {
    const ExchangeRate = sequelize.define('ExchangeRate', {
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      targetSymbol: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    return ExchangeRate;
  };
  