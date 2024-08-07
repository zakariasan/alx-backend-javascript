const request = require('request');
const { expect } = require('chai');

const API_URL = 'http://localhost:7865';

describe('API integration test', () => {
  it('GET / returns correct response', (done) => {
    request.get(`${API_URL}/`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Welcome to the payment system');
      done();
    });
  });
});
