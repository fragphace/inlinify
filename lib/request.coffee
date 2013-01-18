url = require 'url'

class Request
  constructor: (u) ->
    @url = u
    @parsedUrl = url.parse u

module.exports = Request