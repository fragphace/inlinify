fs = require 'fs'
path = require 'path'
Inlinifier = require './inlinifier'

class FileInlinifier extends Inlinifier
	getResource: (callback) ->
		res = fs.readFileSync(@parsedUrl.path).toString()
		callback null, res

	getRelativeResource: (resPath, callback) ->
		callback null, fs.readFileSync(path.resolve(path.dirname(@parsedUrl.path), resPath)).toString()

module.exports = FileInlinifier