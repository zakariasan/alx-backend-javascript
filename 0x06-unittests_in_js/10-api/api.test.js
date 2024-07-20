const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('./api'); // Make sure the server is running before testing

chai.use(chaiHttp);

describe('API Integration Tests', () => {
  const API_URL = 'http://localhost:7865';

  it('GET / should return status 200 and the correct message', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Welcome to the payment system');
        done();
      });
  });

  it('GET /cart/:id should return status 200 and the correct message for valid :id', (done) => {
    chai.request(app)
      .get('/cart/47')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Payment methods for cart 47');
        done();
      });
  });

  it('GET /cart/:id should return 404 for negative number values in :id', (done) => {
    chai.request(app)
      .get('/cart/-47')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(404);
        done();
      });
  });

  it('GET /cart/:id should return 404 for non-numeric values in :id', (done) => {
    chai.request(app)
      .get('/cart/d200-44a5-9de6')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(404);
        done();
      });
  });

  it('POST /login should return status 200 and the correct message', (done) => {
    chai.request(app)
      .post('/login')
      .send({ userName: 'Pinkbrook' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Welcome Pinkbrook');
        done();
      });
  });

  it('GET /available_payments should return status 200 and the correct payment methods', (done) => {
    chai.request(app)
      .get('/available_payments')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          payment_methods: {
            credit_cards: true,
            paypal: false
          }
        });
        done();
      });
  });
});
