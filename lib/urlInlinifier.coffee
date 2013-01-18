request = require 'request'
path = require 'path'
Inlinifier = require './inlinifier'

class UrlInlinifier extends Inlinifier
	getResource: (callback) ->
		request.get @url, (err, res, body) =>
			callback err, body

	getRelativeResource: (resPath, callback) ->
		absPath = @parsedUrl.protocol + '//' + @parsedUrl.host + path.resolve(path.dirname(@parsedUrl.path), resPath)
		request.get absPath, (err, res, body) =>
			callback err, body

module.exports = UrlInlinifier