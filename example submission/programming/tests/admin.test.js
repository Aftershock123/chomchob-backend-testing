const request = require('supertest');
const app = require('../../index');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Admin routes', () => {
  it('should create a new cryptocurrency', async () => {
    const response = await request(app)
      .post('/api/admin/cryptocurrency')
      .send({ name: 'Bitcoin', symbol: 'BTC' });
    
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Bitcoin');
  });

  it('should update user balance', async () => {
    // Setup
    const cryptoResponse = await request(app)
      .post('/api/admin/cryptocurrency')
      .send({ name: 'Ethereum', symbol: 'ETH' });

    const userResponse = await request(app)
      .post('/api/admin/user')
      .send({ username: 'User1' });

    const walletResponse = await request(app)
      .post('/api/admin/wallet')
      .send({ UserId: userResponse.body.id, CryptocurrencyId: cryptoResponse.body.id });

    // Test
    const response = await request(app)
      .post('/api/admin/balance')
      .send({ userId: userResponse.body.id, cryptoId: cryptoResponse.body.id, amount: 100 });
    
    expect(response.status).toBe(200);
    expect(response.body.balance).toBe(100);
  });

  it('should get total balance of all cryptocurrencies', async () => {
    const response = await request(app)
      .get('/api/admin/total-balance');
    
    expect(response.status).toBe(200);
    expect(response.body.totalBalance).toBeGreaterThan(0);
  });
});
