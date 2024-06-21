const request = require('supertest');
const app = require('../../index');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('User routes', () => {
  it('should transfer cryptocurrency between users', async () => {
    // Setup
    const cryptoResponse = await request(app)
      .post('/api/admin/cryptocurrency')
      .send({ name: 'Ethereum', symbol: 'ETH' });

    const senderResponse = await request(app)
      .post('/api/admin/user')
      .send({ username: 'Sender' });

    const receiverResponse = await request(app)
      .post('/api/admin/user')
      .send({ username: 'Receiver' });

    const senderWalletResponse = await request(app)
      .post('/api/admin/wallet')
      .send({ UserId: senderResponse.body.id, CryptocurrencyId: cryptoResponse.body.id });

    const receiverWalletResponse = await request(app)
      .post('/api/admin/wallet')
      .send({ UserId: receiverResponse.body.id, CryptocurrencyId: cryptoResponse.body.id });

    await request(app)
      .post('/api/admin/balance')
      .send({ userId: senderResponse.body.id, cryptoId: cryptoResponse.body.id, amount: 100 });

    // Test
    const response = await request(app)
      .post('/api/user/transfer')
      .send({ senderId: senderResponse.body.id, receiverId: receiverResponse.body.id, cryptoSymbol: 'ETH', amount: 50 });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Transfer successful');
  });

  it('should transfer cryptocurrency with exchange between users', async () => {
    // Setup
    const ethResponse = await request(app)
      .post('/api/admin/cryptocurrency')
      .send({ name: 'Ethereum', symbol: 'ETH' });

    const btcResponse = await request(app)
      .post('/api/admin/cryptocurrency')
      .send({ name: 'Bitcoin', symbol: 'BTC' });

    const senderResponse = await request(app)
      .post('/api/admin/user')
      .send({ username: 'Sender' });

    const receiverResponse = await request(app)
      .post('/api/admin/user')
      .send({ username: 'Receiver' });

    const senderWalletResponse = await request(app)
      .post('/api/admin/wallet')
      .send({ UserId: senderResponse.body.id, CryptocurrencyId: ethResponse.body.id });

    const receiverWalletResponse = await request(app)
      .post('/api/admin/wallet')
      .send({ UserId: receiverResponse.body.id, CryptocurrencyId: btcResponse.body.id });

    await request(app)
      .post('/api/admin/balance')
      .send({ userId: senderResponse.body.id, cryptoId: ethResponse.body.id, amount: 100 });

    await request(app)
      .post('/api/admin/exchange-rate')
      .send({ cryptoId: ethResponse.body.id, targetSymbol: 'BTC', rate: 0.05 });

    // Test
    const response = await request(app)
      .post('/api/user/transfer/exchange')
      .send({ senderId: senderResponse.body.id, receiverId: receiverResponse.body.id, fromCryptoSymbol: 'ETH', toCryptoSymbol: 'BTC', amount: 100 });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Exchange transfer successful');
  });
});
