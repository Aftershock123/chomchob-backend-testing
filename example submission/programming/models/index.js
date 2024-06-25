const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_Name, process.env.DB_User,  process.env.DB_Password, {
  host: process.env.DB_Host ,
  port: process.env.DB_Port ,
  dialect: process.env.DB_Tool,
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
