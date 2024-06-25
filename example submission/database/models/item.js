module.exports = (sequelize,Sequelize) => {
  const Item = sequelize.define('Item', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    detail: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    openSaleDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    endSaleDate: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  return Item;
};
