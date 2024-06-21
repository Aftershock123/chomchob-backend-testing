const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('wallet_db', 'root', '1234', {
  host: 'localhost',
  port: 3308,
  dialect: 'mariadb',
  dialectOptions: {
    allowPublicKeyRetrieval: true
  }
});


const User = require('./user')(sequelize, DataTypes);
const Wallet = require('./wallet')(sequelize, DataTypes);
const Transaction = require('./transaction')(sequelize, DataTypes);
const Cryptocurrency = require('./cryptocurrency')(sequelize, DataTypes);
const ExchangeRate = require('./exchangeRate')(sequelize, DataTypes);

User.hasMany(Wallet);
Wallet.belongsTo(User);
Wallet.hasMany(Transaction);
Transaction.belongsTo(Wallet);
Cryptocurrency.hasMany(Wallet);
Wallet.belongsTo(Cryptocurrency);
Cryptocurrency.hasMany(ExchangeRate);
ExchangeRate.belongsTo(Cryptocurrency);

module.exports = { sequelize, User, Wallet, Transaction, Cryptocurrency, ExchangeRate };
