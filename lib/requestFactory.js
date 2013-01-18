var FileRequest, RequestFactory, WebRequest, url;

url = require('url');

FileRequest = require('./fileRequest');

WebRequest = require('./webRequest');

RequestFactory = (function() {

  function RequestFactory() {}

  return RequestFactory;

})();

RequestFactory.create = function(u) {
  var parsedUrl;
  parsedUrl = url.parse(u);
  if (!RequestFactory.isProtocolSupported(parsedUrl.protocol)) {
    throw new Error("Unsupported protocol \"" + parsedUrl.protocol + "\"");
  }
  if (parsedUrl.protocol === 'file:') {
    return new FileRequest(u);
  } else {
    return new WebRequest(u);
  }
};

RequestFactory.isProtocolSupported = function(protocol) {
  if (protocol === 'http:' || protocol === 'https:' || protocol === 'file:') {
    return true;
  } else {
    return false;
  }
};

RequestFactory.createRelative = function(baseUrl, relUrl) {
  return RequestFactory.create(url.resolve(baseUrl, relUrl));
};

module.exports = RequestFactory;
