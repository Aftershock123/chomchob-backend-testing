const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, User, Wallet, Transaction, Cryptocurrency, ExchangeRate } = require('./programming/models');
const routes = require('./routes');
const app = express();

app.use('/api', routes);

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  sequelize.sync();
});

module.exports = app;
