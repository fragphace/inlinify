var Request, url;

url = require('url');

Request = (function() {

  function Request(u) {
    this.url = u;
    this.parsedUrl = url.parse(u);
  }

  return Request;

})();

module.exports = Request;
