var FileRequest, buster, expectationHelper, fs, http, server;

buster = require('buster');

server = require('./server');

http = require('http');

fs = require('fs');

expectationHelper = require('./helper/expectation');

FileRequest = require('../lib/fileRequest');

buster.testCase('FileRequest', {
  setUp: function() {
    return this.request = new FileRequest('file://' + __dirname + '/expectation/blank.html');
  },
  'test get content': function(done) {
    var _this = this;
    return this.request.getContent(function(err, content) {
      assert.equals(content, expectationHelper.getExpectation('blank'));
      return done();
    });
  }
});
