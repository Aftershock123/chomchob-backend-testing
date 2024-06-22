const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, User, Wallet, Transaction, Cryptocurrency, ExchangeRate } = require('./models');
const routes = require('./routes');  // Adjust path as per your project structure
const app = express();

// Middleware function
const loggerMiddleware = (req, res, next) => {
  console.log('Logging request:', req.method, req.url);
  next();
};

// Middleware setup
app.use(loggerMiddleware);
app.use(bodyParser.json());

// Routes setup
app.use('/api', routes);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  sequelize.sync();
});

module.exports = app;
