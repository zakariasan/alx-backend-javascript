// api.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('./api');  // Ensure the server is running before testing

chai.use(chaiHttp);

describe('available_payments endpoint', () => {
  it('should return status code 200 and correct response', (done) => {
    chai.request(app)
      .get('/available_payments')
      .end((err, res) => {
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

describe('login endpoint', () => {
  it('should return status code 200 and welcome message', (done) => {
    chai.request(app)
      .post('/login')
      .send({ userName: 'Betty' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Welcome Betty');
        done();
      });
  });
});

