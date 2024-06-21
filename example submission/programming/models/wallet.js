module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      }
    });
    return Wallet;
  };
  