url = require 'url'
FileRequest = require './fileRequest'
WebRequest = require './webRequest'

class RequestFactory

RequestFactory.create = (u) ->
  parsedUrl = url.parse u
  unless RequestFactory.isProtocolSupported(parsedUrl.protocol)
    throw new Error "Unsupported protocol \"#{parsedUrl.protocol}\""
  if parsedUrl.protocol is 'file:' then new FileRequest u else new WebRequest u

RequestFactory.isProtocolSupported = (protocol) ->
  if protocol in ['http:', 'https:', 'file:'] then true else false

RequestFactory.createRelative = (baseUrl, relUrl) ->
  RequestFactory.create url.resolve baseUrl, relUrl

module.exports = RequestFactory