var Inlinifier, UrlInlinifier, request,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

request = require('request');

Inlinifier = require('./inlinifier');

UrlInlinifier = (function(_super) {

  __extends(UrlInlinifier, _super);

  function UrlInlinifier() {
    return UrlInlinifier.__super__.constructor.apply(this, arguments);
  }

  return UrlInlinifier;

})(Inlinifier);

UrlInlinifier.getResource = function(docUrl, callback) {
  var _this = this;
  return request.get(docUrl, function(err, res, body) {
    return callback(err, body);
  });
};

module.exports = UrlInlinifier;
