var buster, expectationHelper, fs;

buster = require('buster');

fs = require('fs');

expectationHelper = require('./helper/expectation');

buster.testCase('FileInlinifier', {
  'test basic example': function(done) {
    return expectationHelper.assertFileEqualsExpectation('basic', done);
  },
  'test nothing': function(done) {
    return expectationHelper.assertFileEqualsExpectation('blank', done);
  },
  'test inline': function(done) {
    return expectationHelper.assertFileEqualsExpectation('inline', done);
  }
});
