var Inlinifier, buster, fs;

buster = require('buster');

fs = require('fs');

Inlinifier = require('../lib/inlinifier');

buster.testCase('Inlinifier', {
  'scripts': {
    'test one simple script': function(done) {
      var inlinifier,
        _this = this;
      inlinifier = new Inlinifier(__dirname + '/fixture/index.html');
      return inlinifier.inlinify(function() {
        var html, script;
        html = fs.readFileSync(__dirname + '/fixture/index.html').toString();
        script = fs.readFileSync(__dirname + '/fixture/script.js').toString();
        html = html.replace(/\<script.*/, '<script>' + script + '</script>');
        assert.equals(inlinifier.content, html);
        return done();
      });
    },
    'test no script': function(done) {
      var inlinifier,
        _this = this;
      inlinifier = new Inlinifier(__dirname + '/fixture/noScript.html');
      return inlinifier.inlinify(function() {
        var html;
        html = fs.readFileSync(__dirname + '/fixture/noScript.html').toString();
        assert.equals(inlinifier.content, html);
        return done();
      });
    },
    'test inline script': function(done) {
      var inlinifier,
        _this = this;
      inlinifier = new Inlinifier(__dirname + '/fixture/inlineScript.html');
      return inlinifier.inlinify(function() {
        var html;
        html = fs.readFileSync(__dirname + '/fixture/inlineScript.html').toString();
        assert.equals(inlinifier.content, html);
        return done();
      });
    }
  },
  'styles': {
    '//test one simple css': function(done) {
      var inlinifier,
        _this = this;
      inlinifier = new Inlinifier(__dirname + '/fixture/index.html');
      return inlinifier.inlinify(function() {
        var css, html;
        html = fs.readFileSync(__dirname + '/fixture/index.html').toString();
        css = fs.readFileSync(__dirname + '/fixture/style.css').toString();
        html = html.replace(/\<link.*/, '<style>' + css + '</style>');
        assert.equals(inlinifier.content, html);
        return done();
      });
    }
  }
});
