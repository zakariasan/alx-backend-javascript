const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('./api');  // Ensure the server is running before testing

chai.use(chaiHttp);

describe('API integration test', () => {
  describe('Index page', () => {
    it('should return status code 200', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should return the correct message', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Welcome to the payment system');
          done();
        });
    });
  });

  describe('Cart page', () => {
    it('should return status code 200 when :id is a number', (done) => {
      chai.request(app)
        .get('/cart/12')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should return correct message when :id is a number', (done) => {
      chai.request(app)
        .get('/cart/12')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Payment methods for cart 12');
          done();
        });
    });

    it('should return status code 404 when :id is not a number', (done) => {
      chai.request(app)
        .get('/cart/hello')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should return correct error message when :id is not a number', (done) => {
      chai.request(app)
        .get('/cart/hello')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Invalid cart ID');
          done();
        });
    });

    it('should return status code 404 for negative :id', (done) => {
      chai.request(app)
        .get('/cart/-47')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
