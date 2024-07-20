const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('./api');  // Ensure the server is running before testing

chai.use(chaiHttp);

describe('API Integration Test', () => {
  const API_URL = 'http://localhost:7865';

  describe('Index page', () => {
    it('should return status code 200 and correct message', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Welcome to the payment system');
          done();
        });
    });
  });

  describe('Cart page', () => {
    it('should return status code 200 and correct message for valid :id', (done) => {
      chai.request(app)
        .get('/cart/47')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Payment methods for cart 47');
          done();
        });
    });

    it('should return status code 404 for negative number values in :id', (done) => {
      chai.request(app)
        .get('/cart/-47')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should return status code 404 for non-numeric values in :id', (done) => {
      chai.request(app)
        .get('/cart/d200-44a5-9de6')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
