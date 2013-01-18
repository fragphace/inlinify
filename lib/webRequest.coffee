request = require 'request'
Request = require './request'

class WebRequest extends Request
	getContent: (callback) ->
		request.get @url, (err, res, body) =>
			callback err, body

module.exports = WebRequest