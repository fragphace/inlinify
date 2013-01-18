var WebRequest, baseUrl, buster, expectationHelper, fs, http, port, server;

buster = require('buster');

server = require('./server');

http = require('http');

fs = require('fs');

expectationHelper = require('./helper/expectation');

WebRequest = require('../lib/webRequest');

port = 3128;

baseUrl = 'http://127.0.0.1:' + port;

buster.testCase('WebRequest', {
  setUp: function() {
    this.httpServer = http.createServer(server);
    this.httpServer.listen(port);
    return this.request = new WebRequest(baseUrl + '/blank');
  },
  tearDown: function() {
    return this.httpServer.close();
  },
  'test get content': function(done) {
    var _this = this;
    return this.request.getContent(function(err, content) {
      assert.equals(content, expectationHelper.getExpectation('blank'));
      return done();
    });
  }
});
