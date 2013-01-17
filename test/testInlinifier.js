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
        script = fs.readFileSync(__dirname + '/fixture/jquery.js').toString();
        html = html.replace(/\<script.*/, '<script>' + script + '</script>');
        assert(inlinifier.content, html);
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
        assert(inlinifier.content, html);
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
        assert(inlinifier.content, html);
        return done();
      });
    }
  }
});
