/*var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});*/

const assert = require('assert');
describe('File to be tested', () => {
  context('function to be tested', () => {
    before(() => {
      console.log("=== BEFORE ====")
    });
    after(() => {
      console.log("=== AFTER ====")
    });
    beforeEach(() => {
      console.log("=== BEFORE-EACH ====")
    });
    afterEach(() => {
      console.log("=== AFTER-EACH ====")
    });

    it('Should do something', () => {
      assert.equal(1, 1);
    });

    it('Should do something else', () => {
      assert.deepEqual({name: 'joe'}, {name: 'joe'});
    });

    it('This is pending test');
  });

  context('Another function', () => {
    it('Should do something');
  });

})