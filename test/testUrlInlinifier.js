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
  'get resource': {
    'test get': function(done) {
      var _this = this;
      return UrlInlinifier.getResource('http://127.0.0.1:3128/blank', function(err, res) {
        assert.equals(res, expectationHelper.getExpectation('blank'));
        return done();
      });
    }
  },
  'test blank': function(done) {
    var inlinifier;
    inlinifier = new UrlInlinifier('http://127.0.0.1:3128/blank');
    return inlinifier.inlinify(function() {
      assert.equals(inlinifier.content, fs.readFileSync(__dirname + '/expectation/blank.html').toString());
      return done();
    });
  }
});
