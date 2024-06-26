const express = require('express');
const { Wallet, Transaction, Cryptocurrency, ExchangeRate, User } = require('../models');

const router = express.Router();


// Transfer same cryptocurrency between users
router.post('/transfer', async (req, res) => {
  const {  receiverId, cryptoSymbol, amount } = req.body;
  try {
    const senderId = req.user.id;
   
    const receiver = await User.findOne({ where: { Uid: receiverId } });
    const UserReceiverId = receiver.id;
    const CryptocurrencyIdBysenderId = await Wallet.findOne({ where: { UserId: senderId } }).then((wallet) => wallet.CryptocurrencyId); 

    const crypto = await Cryptocurrency.findOne({ where: { symbol: cryptoSymbol } });
    const senderWallet = await Wallet.findOne({ where: { UserId: senderId, CryptocurrencyId: CryptocurrencyIdBysenderId } });
    const receiverWallet = await Wallet.findOne({ where: { UserId: UserReceiverId, CryptocurrencyId: crypto.id } });
    const senderWalletId = senderWallet.CryptocurrencyId;
    const receiverWalletId = receiverWallet.CryptocurrencyId;

    if(senderWalletId !== receiverWalletId){
      return res.status(400).json({ error: 'Sender and receiver wallets must be the same' });
    }else{

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
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transfer different cryptocurrencies between users
router.post('/transfer/exchange', async (req, res) => {
  const {receiverId, toCryptoSymbol, amount } = req.body;
  try {
    const senderId = req.user.id;
    const receiver = await User.findOne({ where: { Uid: receiverId } });
    const UserReceiverId = receiver.id;
    const CryptocurrencyIdBysenderId = await Wallet.findOne({ where: { UserId: senderId } }).then((wallet) => wallet.CryptocurrencyId); 
    const toCrypto = await Cryptocurrency.findOne({ where: { symbol: toCryptoSymbol } });
    const senderWallet = await Wallet.findOne({ where: { UserId: senderId, CryptocurrencyId: CryptocurrencyIdBysenderId } });
    const receiverWallet = await Wallet.findOne({ where: { UserId: UserReceiverId, CryptocurrencyId: toCrypto.id } });
    const senderWalletId = senderWallet.CryptocurrencyId;
    const receiverWalletId = receiverWallet.CryptocurrencyId;
    const exchangeRate = await ExchangeRate.findOne({ where: { CryptocurrencyId: CryptocurrencyIdBysenderId, targetSymbol: toCryptoSymbol } });
    if (!exchangeRate) {
      return res.status(400).json({ error: 'Exchange rate not found' });
    }
    if(senderWalletId == receiverWalletId){
      return res.status(400).json({ error: 'Sender and receiver wallets must be the different' });
      
    }else{
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

    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
