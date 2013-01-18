var FileRequest, Request, fs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

fs = require('fs');

Request = require('./request');

FileRequest = (function(_super) {

  __extends(FileRequest, _super);

  function FileRequest() {
    return FileRequest.__super__.constructor.apply(this, arguments);
  }

  FileRequest.prototype.getContent = function(callback) {
    return callback(null, fs.readFileSync(this.parsedUrl.path).toString());
  };

  return FileRequest;

})(Request);

module.exports = FileRequest;
