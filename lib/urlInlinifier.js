var Inlinifier, UrlInlinifier, path, request,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

request = require('request');

path = require('path');

Inlinifier = require('./inlinifier');

UrlInlinifier = (function(_super) {

  __extends(UrlInlinifier, _super);

  function UrlInlinifier() {
    return UrlInlinifier.__super__.constructor.apply(this, arguments);
  }

  UrlInlinifier.prototype.getResource = function(callback) {
    var _this = this;
    return request.get(this.url, function(err, res, body) {
      return callback(err, body);
    });
  };

  UrlInlinifier.prototype.getRelativeResource = function(resPath, callback) {
    var absPath,
      _this = this;
    absPath = this.parsedUrl.protocol + '//' + this.parsedUrl.host + path.resolve(path.dirname(this.parsedUrl.path), resPath);
    return request.get(absPath, function(err, res, body) {
      return callback(err, body);
    });
  };

  return UrlInlinifier;

})(Inlinifier);

module.exports = UrlInlinifier;
