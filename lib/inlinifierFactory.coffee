url = require 'url'
FileInlinifier = require './fileInlinifier'
UrlInlinifier = require './urlInlinifier'

class InlinifierFactory

InlinifierFactory.create = (u) ->
	parsedUrl = url.parse u
	unless InlinifierFactory.isProtocolSupported(parsedUrl.protocol)
		throw new Error "Unsupported protocol \"#{parsedUrl.protocol}\""
	if parsedUrl.protocol is 'file:' then new FileInlinifier u else new UrlInlinifier u

InlinifierFactory.isProtocolSupported = (protocol) ->
	if protocol in ['http:', 'https:', 'file:'] then true else false

module.exports = InlinifierFactory