var InlinifierFactory, buster;

buster = require('buster');

InlinifierFactory = require('../lib/inlinifierFactory');

buster.testCase('Inlinifier', {
  '// test throws an exception on invalid url': function() {
    var _this = this;
    return assert.exception(function() {
      return new Inlinifier('foo');
    });
  }
});
