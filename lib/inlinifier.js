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
    var dom, html;
    html = fs.readFileSync(this.path).toString();
    dom = jsdom.jsdom(html);
    this.window = dom.createWindow();
    this.scripts = this.window.document.querySelectorAll('script');
    this.inlinifyScripts();
    this.styles = this.window.document.querySelectorAll('link[type="text/css"]');
    this.inlinifyStyles();
    this.content = dom.doctype.toString();
    this.content += this.window.document.innerHTML;
    return callback();
  };

  Inlinifier.prototype.inlinifyScripts = function() {
    var script, _i, _len, _ref, _results;
    _ref = this.scripts;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      script = _ref[_i];
      _results.push(this.inlinifyScript(script));
    }
    return _results;
  };

  Inlinifier.prototype.inlinifyScript = function(script) {
    var scriptContent, scriptPath;
    if (!script.src) {
      return;
    }
    scriptPath = path.resolve(path.dirname(this.path), script.src);
    scriptContent = fs.readFileSync(scriptPath).toString();
    script.src = '';
    return script.innerHTML = scriptContent;
  };

  Inlinifier.prototype.inlinifyStyles = function() {
    var style, _i, _len, _ref, _results;
    _ref = this.styles;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      style = _ref[_i];
      _results.push(this.inlinifyStyle(style));
    }
    return _results;
  };

  Inlinifier.prototype.inlinifyStyle = function(style) {
    var node, styleContent, stylePath;
    stylePath = path.resolve(path.dirname(this.path), style.href);
    styleContent = fs.readFileSync(stylePath).toString();
    node = this.window.document.createElement('style');
    node.innerHTML = styleContent;
    return style.parentNode.replaceChild(node, style);
  };

  return Inlinifier;

})();

module.exports = Inlinifier;
