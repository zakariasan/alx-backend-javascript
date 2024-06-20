const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', function () {
  describe('SUM', function () {
    it('should return 4 when type is SUM, a is 1 and b is 3', function () {
      assert.strictEqual(calculateNumber('SUM', 1, 3), 4);
    });

    it('should return 5 when type is SUM, a is 1.2 and b is 3.7', function () {
      assert.strictEqual(calculateNumber('SUM', 1.2, 3.7), 5);
    });

    it('should return 6 when type is SUM, a is 1.5 and b is 3.7', function () {
      assert.strictEqual(calculateNumber('SUM', 1.5, 3.7), 6);
    });
  });

  describe('SUBTRACT', function () {
    it('should return -2 when type is SUBTRACT, a is 1 and b is 3', function () {
      assert.strictEqual(calculateNumber('SUBTRACT', 1, 3), -2);
    });

    it('should return -2 when type is SUBTRACT, a is 1.2 and b is 3.7', function () {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.2, 3.7), -2);
    });

    it('should return -2 when type is SUBTRACT, a is 1.5 and b is 3.7', function () {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.5, 3.7), -2);
    });
  });

  describe('DIVIDE', function () {
    it('should return 0.25 when type is DIVIDE, a is 1 and b is 4', function () {
      assert.strictEqual(calculateNumber('DIVIDE', 1, 4), 0.25);
    });

    it('should return 0.2 when type is DIVIDE, a is 1.2 and b is 4.7', function () {
      assert.strictEqual(calculateNumber('DIVIDE', 1.2, 4.7), 0.2);
    });

    it('should return 0.33 when type is DIVIDE, a is 1.5 and b is 4.5', function () {
      assert.strictEqual(calculateNumber('DIVIDE', 1.5, 4.5), 0.33);
    });

    it('should return Error when type is DIVIDE, a is 1 and b is 0', function () {
      assert.strictEqual(calculateNumber('DIVIDE', 1, 0), 'Error');
    });

    it('should return Error when type is DIVIDE, a is 1 and b is 0.4', function () {
      assert.strictEqual(calculateNumber('DIVIDE', 1, 0.4), 'Error');
    });
  });
});

