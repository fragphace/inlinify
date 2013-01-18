var FileInlinifier, InlinifierFactory, UrlInlinifier, url;

url = require('url');

FileInlinifier = require('./fileInlinifier');

UrlInlinifier = require('./urlInlinifier');

InlinifierFactory = (function() {

  function InlinifierFactory() {}

  return InlinifierFactory;

})();

InlinifierFactory.create = function(u) {
  var parsedUrl;
  parsedUrl = url.parse(u);
  if (!InlinifierFactory.isProtocolSupported(parsedUrl.protocol)) {
    throw new Error("Unsupported protocol \"" + parsedUrl.protocol + "\"");
  }
  if (parsedUrl.protocol === 'file:') {
    return new FileInlinifier(u);
  } else {
    return new UrlInlinifier(u);
  }
};

InlinifierFactory.isProtocolSupported = function(protocol) {
  if (protocol === 'http:' || protocol === 'https:' || protocol === 'file:') {
    return true;
  } else {
    return false;
  }
};

module.exports = InlinifierFactory;
