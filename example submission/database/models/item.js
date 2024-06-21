module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
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
      },
      saleStartDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      saleEndDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
    return Item;
  };
  