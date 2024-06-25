module.exports = (sequelize,Sequelize) => {
  const Bundle = sequelize.define('Bundle', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    }
  });
    return Bundle;
  };
  