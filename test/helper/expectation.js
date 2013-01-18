var Inlinifier, fs;

fs = require('fs');

Inlinifier = require('../../lib/inlinifier');

module.exports = {
  assertUrlEqualsExpectation: function(url, expectationName, done) {
    var inlinifier,
      _this = this;
    inlinifier = new Inlinifier(url);
    return inlinifier.inlinify(function() {
      assert.equals(inlinifier.content, _this.getExpectation(expectationName));
      return done();
    });
  },
  getExpectation: function(name) {
    return fs.readFileSync(__dirname + '/../expectation/' + name + '.html').toString();
  },
  assertFileEqualsExpectation: function(name, done) {
    return this.assertUrlEqualsExpectation('file://' + __dirname + '/../fixture/' + name + '.html', name, done);
  },
  assertWebpageEqualsExpectation: function(name, done) {
    return this.assertUrlEqualsExpectation('http://127.0.0.1:3128/' + name, name, done);
  }
};
