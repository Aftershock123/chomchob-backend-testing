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
      const ethereumcurrency = await Cryptocurrency.findOrCreate({
        where: { id: 2 },
        defaults: {
          name: 'Ethereum',
          symbol: 'ETH'
        }
      });
  
      if (cryptocurrency) {
        console.log('Cryptocurrency created successfully.');
      }
      if (ethereumcurrency) {
        console.log('Ethereumcurrency created successfully.');
      }
    });

    return Cryptocurrency;
  };
  