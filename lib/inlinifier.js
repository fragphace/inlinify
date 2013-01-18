var Inlinifier, RequestFactory, async, fs, jsdom, path, url, _;

jsdom = require('jsdom');

path = require('path');

fs = require('fs');

url = require('url');

async = require('async');

_ = require('underscore');

RequestFactory = require('./requestFactory');

Inlinifier = (function() {

  function Inlinifier(u) {
    this.url = u;
    this.parsedUrl = url.parse(this.url);
    this.mainRequest = RequestFactory.create(this.url);
  }

  Inlinifier.prototype.inlinify = function(callback) {
    var _this = this;
    return this.mainRequest.getContent(function(err, res) {
      var dom;
      dom = jsdom.jsdom(res);
      _this.window = dom.createWindow();
      return _this.inlinifyScripts(function() {
        return _this.inlinifyStyles(function() {
          _this.content = dom.doctype.toString();
          _this.content += _this.window.document.innerHTML;
          return callback();
        });
      });
    });
  };

  Inlinifier.prototype.inlinifyScripts = function(callback) {
    var inlinifiers,
      _this = this;
    this.scripts = this.window.document.querySelectorAll('script');
    inlinifiers = this.scripts.map(function(script) {
      return _.bind(_this.inlinifyScript, _this, script);
    });
    return async.parallel(inlinifiers, callback);
  };

  Inlinifier.prototype.inlinifyScript = function(script, callback) {
    var request,
      _this = this;
    if (!script.src) {
      callback();
      return;
    }
    request = RequestFactory.createRelative(this.url, script.src);
    return request.getContent(function(err, res) {
      script.innerHTML = res;
      script.src = '';
      return callback(err, res);
    });
  };

  Inlinifier.prototype.inlinifyStyles = function(callback) {
    var inlinifiers,
      _this = this;
    this.styles = this.window.document.querySelectorAll('link[type="text/css"]');
    inlinifiers = this.styles.map(function(style) {
      return _.bind(_this.inlinifyStyle, _this, style);
    });
    return async.parallel(inlinifiers, callback);
  };

  Inlinifier.prototype.inlinifyStyle = function(link, callback) {
    var request,
      _this = this;
    request = RequestFactory.createRelative(this.url, link.href);
    return request.getContent(function(err, res) {
      var style;
      style = _this.window.document.createElement('style');
      style.innerHTML = res;
      link.parentNode.replaceChild(style, link);
      return callback(err, res);
    });
  };

  return Inlinifier;

})();

module.exports = Inlinifier;
