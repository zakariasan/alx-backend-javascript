const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', function () {
  describe('SUM', function () {
    it('should return 4 when type is SUM, a is 1 and b is 3', function () {
      expect(calculateNumber('SUM', 1, 3)).to.equal(4);
    });

    it('should return 5 when type is SUM, a is 1.2 and b is 3.7', function () {
      expect(calculateNumber('SUM', 1.2, 3.7)).to.equal(5);
    });

    it('should return 6 when type is SUM, a is 1.5 and b is 3.7', function () {
      expect(calculateNumber('SUM', 1.5, 3.7)).to.equal(6);
    });
  });

  describe('SUBTRACT', function () {
    it('should return -2 when type is SUBTRACT, a is 1 and b is 3', function () {
      expect(calculateNumber('SUBTRACT', 1, 3)).to.equal(-2);
    });

    it('should return -2 when type is SUBTRACT, a is 1.2 and b is 3.7', function () {
      expect(calculateNumber('SUBTRACT', 1.2, 3.7)).to.equal(-2);
    });

    it('should return -2 when type is SUBTRACT, a is 1.5 and b is 3.7', function () {
      expect(calculateNumber('SUBTRACT', 1.5, 3.7)).to.equal(-2);
    });
  });

  describe('DIVIDE', function () {
    it('should return 0.25 when type is DIVIDE, a is 1 and b is 4', function () {
      expect(calculateNumber('DIVIDE', 1, 4)).to.be.closeTo(0.25, 0.01);
    });

    it('should return 0.2 when type is DIVIDE, a is 1.2 and b is 4.7', function () {
      expect(calculateNumber('DIVIDE', 1.2, 4.7)).to.be.closeTo(0.2, 0.01);
    });

    it('should return 0.33 when type is DIVIDE, a is 1.5 and b is 4.5', function () {
      expect(calculateNumber('DIVIDE', 1.5, 4.5)).to.be.closeTo(0.33, 0.01);
    });

    it('should return Error when type is DIVIDE, a is 1 and b is 0', function () {
      expect(calculateNumber('DIVIDE', 1, 0)).to.equal('Error');
    });

    it('should return Error when type is DIVIDE, a is 1 and b is 0.4', function () {
      expect(calculateNumber('DIVIDE', 1, 0.4)).to.equal('Error');
    });
  });
});

