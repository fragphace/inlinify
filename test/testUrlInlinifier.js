var UrlInlinifier, buster, expectationHelper, fs, http, server;

buster = require('buster');

fs = require('fs');

http = require('http');

server = require('./server');

UrlInlinifier = require('../lib/urlInlinifier');

expectationHelper = require('./helper/expectation');

buster.testCase('UrlInlinifier', {
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
});
