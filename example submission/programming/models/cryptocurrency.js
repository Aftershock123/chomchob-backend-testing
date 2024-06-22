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

    sequelize.sync().then(async () => {
      const cryptocurrency = await Cryptocurrency.findOrCreate({
        where: { id: 1 },
        defaults: {
          name: 'Bitcoin',
          symbol: 'BTC'
        }
      });
  
      if (cryptocurrency) {
        console.log('Cryptocurrency created successfully.');
      }
    });

    return Cryptocurrency;
  };
  