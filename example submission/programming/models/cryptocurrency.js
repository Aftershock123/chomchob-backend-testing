module.exports = (sequelize, DataTypes) => {
    const Cryptocurrency = sequelize.define('Cryptocurrency', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
    return Cryptocurrency;
  };
  