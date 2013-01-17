var InlinifierFactory, fs, jsdom, path, request, url;

jsdom = require('jsdom');

fs = require('fs');

path = require('path');

url = require('url');

request = require('request');

InlinifierFactory = (function() {

  function InlinifierFactory() {}

  InlinifierFactory.prototype.create = function() {
    if (!this.isProtocolSupported(this.parsedUrl.protocol)) {
      throw new Error("Unsupported protocol \"" + this.parsedUrl.protocol + "\"");
    }
  };

  InlinifierFactory.prototype.isProtocolSupported = function(protocol) {
    if (protocol === 'http:' || protocol === 'https:' || protocol === 'file:') {
      return true;
    } else {
      return false;
    }
  };

  return InlinifierFactory;

})();

module.exports = InlinifierFactory;
