var FileInlinifier, UrlInlinifier, fs;

fs = require('fs');

FileInlinifier = require('../../lib/fileInlinifier');

UrlInlinifier = require('../../lib/urlInlinifier');

module.exports = {
  assertUrlEqualsExpectation: function(Inlinifier, url, expectationName, done) {
    var inlinifier,
      _this = this;
    inlinifier = new Inlinifier(url);
    return inlinifier.inlinify(function() {
      assert.equals(inlinifier.content, getExpectation(name));
      return done();
    });
  },
  getExpectation: function(name) {
    return fs.readFileSync(__dirname + '/../expectation/' + name + '.html').toString();
  },
  assertFileEqualsExpectation: function(name, done) {
    return assertUrlEqualsExpectation(FileInlinifier, 'file://' + __dirname + '/fixture/' + name + '.html', name, done);
  }
};
