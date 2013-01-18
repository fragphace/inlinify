var FileInlinifier, Inlinifier, fs, path,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

fs = require('fs');

path = require('path');

Inlinifier = require('./inlinifier');

FileInlinifier = (function(_super) {

  __extends(FileInlinifier, _super);

  function FileInlinifier() {
    return FileInlinifier.__super__.constructor.apply(this, arguments);
  }

  FileInlinifier.prototype.getResource = function(callback) {
    var res;
    res = fs.readFileSync(this.parsedUrl.path).toString();
    return callback(null, res);
  };

  FileInlinifier.prototype.getRelativeResource = function(resPath, callback) {
    return callback(null, fs.readFileSync(path.resolve(path.dirname(this.parsedUrl.path), resPath)).toString());
  };

  return FileInlinifier;

})(Inlinifier);

module.exports = FileInlinifier;
