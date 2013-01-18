var Request, WebRequest, request,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

request = require('request');

Request = require('./request');

WebRequest = (function(_super) {

  __extends(WebRequest, _super);

  function WebRequest() {
    return WebRequest.__super__.constructor.apply(this, arguments);
  }

  WebRequest.prototype.getContent = function(callback) {
    var _this = this;
    return request.get(this.url, function(err, res, body) {
      return callback(err, body);
    });
  };

  return WebRequest;

})(Request);

module.exports = WebRequest;
