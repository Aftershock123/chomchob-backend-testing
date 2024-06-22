const express = require('express');
const { sequelize, User, Wallet, Transaction, Cryptocurrency, ExchangeRate } = require('../models');

const router = express.Router();

//create user and wallet
router.post('/create', async (req, res) => {
  const { username } = req.body;
  try {
    const newUser = await User.create({ username });

    const newWallet = await Wallet.create({ CryptocurrencyId: 1 });
    
    await newUser.addWallet(newWallet);

    res.status(201).json({ user: newUser, wallet: newWallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Transfer same cryptocurrency between users
router.post('/transfer', async (req, res) => {
  const { senderId, receiverId, cryptoSymbol, amount } = req.body;
  try {
    const crypto = await Cryptocurrency.findOne({ where: { symbol: cryptoSymbol } });
    const senderWallet = await Wallet.findOne({ where: { UserId: senderId, CryptocurrencyId: crypto.id } });
    const receiverWallet = await Wallet.findOne({ where: { UserId: receiverId, CryptocurrencyId: crypto.id } });

    if (senderWallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await senderWallet.save();
    await receiverWallet.save();

    await Transaction.create({ WalletId: senderWallet.id, amount, type: 'debit' });
    await Transaction.create({ WalletId: receiverWallet.id, amount, type: 'credit' });

    res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transfer different cryptocurrencies between users
router.post('/transfer/exchange', async (req, res) => {
  const { senderId, receiverId, fromCryptoSymbol, toCryptoSymbol, amount } = req.body;
  try {
    const fromCrypto = await Cryptocurrency.findOne({ where: { symbol: fromCryptoSymbol } });
    const toCrypto = await Cryptocurrency.findOne({ where: { symbol: toCryptoSymbol } });
    const senderWallet = await Wallet.findOne({ where: { UserId: senderId, CryptocurrencyId: fromCrypto.id } });
    const receiverWallet = await Wallet.findOne({ where: { UserId: receiverId, CryptocurrencyId: toCrypto.id } });

    const exchangeRate = await ExchangeRate.findOne({ where: { CryptocurrencyId: fromCrypto.id, targetSymbol: toCryptoSymbol } });

    if (!exchangeRate) {
      return res.status(400).json({ error: 'Exchange rate not found' });
    }

    if (senderWallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const receivedAmount = amount * exchangeRate.rate;

    senderWallet.balance -= amount;
    receiverWallet.balance += receivedAmount;

    await senderWallet.save();
    await receiverWallet.save();

    await Transaction.create({ WalletId: senderWallet.id, amount, type: 'debit' });
    await Transaction.create({ WalletId: receiverWallet.id, amount: receivedAmount, type: 'credit' });

    res.status(200).json({ message: 'Exchange transfer successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
