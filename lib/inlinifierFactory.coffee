jsdom = require 'jsdom'
fs = require 'fs'
path = require 'path'
url = require 'url'
request = require 'request'

class InlinifierFactory
	create: ->
		unless @isProtocolSupported(@parsedUrl.protocol)
			throw new Error "Unsupported protocol \"#{@parsedUrl.protocol}\""

	isProtocolSupported: (protocol) ->
		if protocol in ['http:', 'https:', 'file:'] then true else false

module.exports = InlinifierFactory