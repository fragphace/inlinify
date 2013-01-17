var Inlinifier, buster, fs;

buster = require('buster');

fs = require('fs');

Inlinifier = require('../lib/inlinifier');

buster.testCase('Inlinifier', {
  'test throws an exception on invalid url': function() {
    var _this = this;
    return assert.exception(function() {
      return new Inlinifier('foo');
    });
  },
  'examples': {
    'test basic example': function(done) {
      var inlinifier,
        _this = this;
      inlinifier = new Inlinifier('file://' + __dirname + '/fixture/index.html');
      return inlinifier.inlinify(function() {
        var css, html, script;
        html = fs.readFileSync(__dirname + '/fixture/index.html').toString();
        script = fs.readFileSync(__dirname + '/fixture/script.js').toString();
        css = fs.readFileSync(__dirname + '/fixture/style.css').toString();
        html = html.replace(/\<script.*/, '<script>' + script + '</script>');
        html = html.replace(/\<link.*/, '<style>' + css + '</style>');
        assert.equals(inlinifier.content, html);
        return done();
      });
    },
    'test nothing': function(done) {
      var inlinifier,
        _this = this;
      inlinifier = new Inlinifier('file://' + __dirname + '/fixture/nothing.html');
      return inlinifier.inlinify(function() {
        var html;
        html = fs.readFileSync(__dirname + '/fixture/nothing.html').toString();
        assert.equals(inlinifier.content, html);
        return done();
      });
    },
    'test inline': function(done) {
      var inlinifier,
        _this = this;
      inlinifier = new Inlinifier('file://' + __dirname + '/fixture/inline.html');
      return inlinifier.inlinify(function() {
        var html;
        html = fs.readFileSync(__dirname + '/fixture/inline.html').toString();
        assert.equals(inlinifier.content, html);
        return done();
      });
    }
  }
});
