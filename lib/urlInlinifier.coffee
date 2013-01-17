request = require 'request'
Inlinifier = require './inlinifier'

class UrlInlinifier extends Inlinifier

UrlInlinifier.getResource = (docUrl, callback) ->
	request.get docUrl, (err, res, body) =>
			callback(err, body)

module.exports = UrlInlinifier