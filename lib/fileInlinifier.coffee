fs = require 'fs'
Inlinifier = require './inlinifier'

class FileInlinifier extends Inlinifier
	getResource: (callback) ->
		res = fs.readFileSync(@parsedUrl.path).toString()
		callback null, res

module.exports = FileInlinifier