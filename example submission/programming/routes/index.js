const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Wallet } = require('../models');
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const checkRole = require('../middleware/checkRole');
const router = express.Router();

const isAdmin = checkRole('admin');
const isUser = checkRole('user');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const isValidPassword = await user.validPassword(password);

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const token = jwt.sign({
        id: user.id,
        Uid: user.Uid,
        username: user.username,
        role: user.role
      }, 'your_secret_key', { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: error.message });
    }
  });  

router.post('/create', async (req, res) => {
    const { username, password, CryptocurrencyId } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        password: hashedPassword,
      });
  
      const newWallet = await Wallet.create({ CryptocurrencyId: CryptocurrencyId ? CryptocurrencyId : 1  });
      
      await newUser.addWallet(newWallet);
  
      res.status(201).json({ user: newUser, wallet: newWallet });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
router.use('/admin',isAdmin, adminRoutes);
router.use('/user',isUser, userRoutes);

module.exports = router;
