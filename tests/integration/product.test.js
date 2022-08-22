const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const setupTestDB = require('../utils/setupTestDB');
const app = require('../../src/app');

setupTestDB();

jest.setTimeout(30000);

const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjUxNjIzNDE5NmJhMjAwMzgyNDBjMjgiLCJpYXQiOjE2NjExNDQxNDIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY2MTIzMDU0Mn0.4Ck__ou55fOEX4rHT4tCXUXHn4e8S1RvLgEt1J1Oo50';
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjUxNjIzNDE5NmJhMjAwMzgyNDBjMjgiLCJpYXQiOjE2NjExNDQxNDIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTY2MTIzMDU0Mn0.4Ck__ou55fOEX4rHT4tCXUXHn4e8S1RvLgEt1J1Oo50';

// test for product route
describe('Product Routes', () => {
  let createdProductId;
  describe('POST /v1/products', () => {
    it('should create a new product', async () => {
      const productBody = {
        name: faker.commerce.productName(),
        brand: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.lorem.paragraph(),
        specifications: faker.lorem.paragraph(),
        howToUse: faker.lorem.paragraph(),
        image: faker.image.image(),
        quantityAvailable: 1,
        category: 'Category 1',
        reviews: [
          {
            userId: '62ff338e84fff12498a12282',
            score: 4,
            description: 'Good',
            isPurchaseVerified: true,
          },
        ],
      };
      const res = await request(app).post('/v1/products').set('Authorization', `Bearer ${adminToken}`).send(productBody);
      createdProductId = res.body.data.id;
      expect(res.status).toBe(httpStatus.CREATED);
      expect(res.body.data).toHaveProperty('id');
    });
  });

  describe('GET /products', () => {
    test('should return all products', async () => {
      const res = await request(app).get('/v1/products').set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(httpStatus.OK);
    });
  });

  describe('PATCH /products/:id', () => {
    test('should delete product by id', async () => {
      const res = await request(app)
        .patch(`/v1/products/${createdProductId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: faker.lorem.paragraph(),
        });
      expect(res.statusCode).toBe(httpStatus.OK);
    });
  });

  describe('POST /products/:id/reviews', () => {
    test('should create a new review', async () => {
      const productReviewBody = {
        userId: '62ff338e84fff12498a12282',
        score: 4,
        description: faker.lorem.paragraph(),
      };
      const res = await request(app)
        .post(`/v1/products/${createdProductId}/reviews`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(productReviewBody);
      expect(res.statusCode).toBe(httpStatus.CREATED);
    });
  });

  describe('GET /products/:id/reviews', () => {
    test('should return all reviews', async () => {
      const res = await request(app)
        .get(`/v1/products/${createdProductId}/reviews`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(httpStatus.OK);
    });
  });

  describe('GET /products/:id/:property', () => {
    test('should return a product property', async () => {
      const res = await request(app)
        .get(`/v1/products/${createdProductId}/name`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(httpStatus.OK);
    });
  });

  describe('DELETE /products/:id', () => {
    test('should delete product by id', async () => {
      const res = await request(app).delete(`/v1/products/${createdProductId}`).set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(httpStatus.OK);
    });
  });
});
