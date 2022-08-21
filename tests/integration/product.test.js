const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const setupTestDB = require('../utils/setupTestDB');
const app = require('../../src/app');

setupTestDB();

let adminToken;
let userToken;

// test login
describe('Auth', () => {
  it('should login admin', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'ahmad.alsharef@medzgo.com',
      password: 'Pass@123',
    });
    adminToken = res.body.tokens;
  });

  it('should login user', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'adds',
      password: 'ssdfds',
    });
    userToken = res.body.tokens;
  });
});

// test for product route
describe('Product Routes', () => {
  let createdProductId;
  describe('POST /api/v1/products', () => {
    it('should create a new product', async () => {
      const productBody = {
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: faker.commerce.price(),
        image: faker.image.image(),
        reviews: [
          {
            userId: faker.random.uuid(),
            review: faker.lorem.paragraph(),
            rating: faker.random.number({ min: 1, max: 5 }),
          },
        ],
      };
      const res = await request(app).post('/api/v1/products').set('Authorization', `Bearer ${adminToken}`).send(productBody);
      expect(res.status).toBe(httpStatus.CREATED);
      expect(res.body.data).toHaveProperty('id');
      createdProductId = res.body.id;
    });
  });

  describe('GET /products', () => {
    test('should return all products', async () => {
      const res = await request(app).get('/v1/products').set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(httpStatus.OK);
    });
  });

  describe('GET /products/:id', () => {
    test('should return product by id', async () => {
      const res = await request(app).get(`/v1/products/${createdProductId}`);
      expect(res.statusCode).toBe(httpStatus.OK);
    });
  });
});
