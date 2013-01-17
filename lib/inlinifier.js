var Inlinifier, fs, jsdom, path;

jsdom = require('jsdom');

fs = require('fs');

path = require('path');

Inlinifier = (function() {

  function Inlinifier(p) {
    this.path = p;
    this.content = '';
    this.scripts = [];
    this.styles = [];
    this.window = null;
  }

  Inlinifier.prototype.inlinify = function(callback) {
    var dom;
    dom = jsdom.jsdom(fs.readFileSync(this.path).toString());
    this.window = dom.createWindow();
    this.inlinifyScripts();
    this.inlinifyStyles();
    this.content = dom.doctype.toString();
    this.content += this.window.document.innerHTML;
    return callback();
  };

  Inlinifier.prototype.inlinifyScripts = function() {
    var script, _i, _len, _ref, _results;
    this.scripts = this.window.document.querySelectorAll('script');
    _ref = this.scripts;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      script = _ref[_i];
      _results.push(this.inlinifyScript(script));
    }
    return _results;
  };

  Inlinifier.prototype.inlinifyScript = function(script) {
    if (!script.src) {
      return;
    }
    script.innerHTML = this.getFileRelativeToDocument(script.src);
    return script.src = '';
  };

  Inlinifier.prototype.inlinifyStyles = function() {
    var style, _i, _len, _ref, _results;
    this.styles = this.window.document.querySelectorAll('link[type="text/css"]');
    _ref = this.styles;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      style = _ref[_i];
      _results.push(this.inlinifyStyle(style));
    }
    return _results;
  };

  Inlinifier.prototype.inlinifyStyle = function(link) {
    var style;
    style = this.window.document.createElement('style');
    style.innerHTML = this.getFileRelativeToDocument(link.href);
    return link.parentNode.replaceChild(style, link);
  };

  Inlinifier.prototype.getFileRelativeToDocument = function(p) {
    return fs.readFileSync(path.resolve(path.dirname(this.path), p)).toString();
  };

  return Inlinifier;

})();

module.exports = Inlinifier;
