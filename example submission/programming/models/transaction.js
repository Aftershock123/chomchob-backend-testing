module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    return Transaction;
  };
  