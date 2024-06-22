const express = require('express');
const { Wallet, Cryptocurrency, ExchangeRate } = require('../models');

const router = express.Router();

// Create a new cryptocurrency
router.post('/cryptocurrency', async (req, res) => {
  const { name, symbol } = req.body;
  try {
    const crypto = await Cryptocurrency.create({ name, symbol });
    res.status(201).json(crypto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user balance
router.post('/balance', async (req, res) => {
  const { userId, cryptoId, amount } = req.body;
  try {
    const wallet = await Wallet.findOne({ where: { UserId: userId, CryptocurrencyId: cryptoId } });
    wallet.balance += amount;
    await wallet.save();
    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get total balance of all cryptocurrencies
router.get('/total-balance', async (req, res) => {
  try {
    const wallets = await Wallet.findAll();
    const totalBalance = wallets.reduce((item, wallet) => item + wallet.balance, 0);
    res.status(200).json({ totalBalance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manage exchange rates
router.post('/exchange-rate', async (req, res) => {
  const { cryptoId, targetSymbol, rate } = req.body;
  try {
    const exchangeRate = await ExchangeRate.create({ CryptocurrencyId: cryptoId, targetSymbol, rate });
    res.status(201).json(exchangeRate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
