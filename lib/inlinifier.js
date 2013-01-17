var Inlinifier, fs, jsdom, path;

jsdom = require('jsdom');

fs = require('fs');

path = require('path');

Inlinifier = (function() {

  function Inlinifier(p) {
    this.path = p;
    this.content = '';
    this.scripts = [];
  }

  Inlinifier.prototype.inlinify = function(callback) {
    var dom, html, window;
    html = fs.readFileSync(this.path).toString();
    dom = jsdom.jsdom(html);
    window = dom.createWindow();
    this.content = dom.doctype.toString();
    this.scripts = window.document.querySelectorAll('script');
    this.inlinifyScripts();
    this.content += window.document.innerHTML;
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

  return Inlinifier;

})();

module.exports = Inlinifier;
