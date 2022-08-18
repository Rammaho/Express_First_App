const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const setupTestDB = require('../utils/setupTestDB');
const app = require('../../src/app');

setupTestDB();

// test for product route
describe('Product Routes', () => {
  describe('GET /products', () => {
    test('should return all products', async () => {
      const res = await request(app).get('/v1/products');
      expect(res.statusCode).toBe(httpStatus.OK);
    });
  });
});
