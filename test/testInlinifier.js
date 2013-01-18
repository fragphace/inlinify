var buster, expectationHelper, fs, http, server;

buster = require('buster');

fs = require('fs');

http = require('http');

server = require('./server');

expectationHelper = require('./helper/expectation');

buster.testCase('Inlinifier', {
  'file': {
    'test basic example': function(done) {
      return expectationHelper.assertFileEqualsExpectation('basic', done);
    },
    'test nothing': function(done) {
      return expectationHelper.assertFileEqualsExpectation('blank', done);
    },
    'test inline': function(done) {
      return expectationHelper.assertFileEqualsExpectation('inline', done);
    }
  },
  'web': {
    setUp: function() {
      this.httpServer = http.createServer(server);
      return this.httpServer.listen(3128);
    },
    tearDown: function() {
      return this.httpServer.close();
    },
    'test blank': function(done) {
      return expectationHelper.assertWebpageEqualsExpectation('blank', done);
    },
    'test basic': function(done) {
      return expectationHelper.assertWebpageEqualsExpectation('basic', done);
    },
    'test inline': function(done) {
      return expectationHelper.assertWebpageEqualsExpectation('inline', done);
    }
  }
});
