request = require 'request'
Inlinifier = require './inlinifier'

class UrlInlinifier extends Inlinifier
  getResource: (callback) ->
  	request.get @url, (err, res, body) =>
  		callback(err, body)

module.exports = UrlInlinifier