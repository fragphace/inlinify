var FileInlinifier, Inlinifier, fs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

fs = require('fs');

Inlinifier = require('./inlinifier');

FileInlinifier = (function(_super) {

  __extends(FileInlinifier, _super);

  function FileInlinifier() {
    return FileInlinifier.__super__.constructor.apply(this, arguments);
  }

  return FileInlinifier;

})(Inlinifier);

module.exports = FileInlinifier;
