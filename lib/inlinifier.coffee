jsdom = require 'jsdom'
fs = require 'fs'
path = require 'path'
url = require 'url'

class Inlinifier
	constructor: (u) ->
		@url = u
		@parsedUrl = url.parse(@url)
		unless @isProtocolSupported(@parsedUrl.protocol)
			throw new Error "Unsupported protocol \"#{@parsedUrl.protocol}\""

	isProtocolSupported: (protocol) ->
		if protocol in ['http:', 'https:', 'file:'] then true else false

	inlinify: (callback) ->
		dom = jsdom.jsdom(fs.readFileSync(@parsedUrl.path).toString())
		@window = dom.createWindow()
		@inlinifyScripts()
		@inlinifyStyles()
		@content = dom.doctype.toString()
		@content += @window.document.innerHTML
		callback()

	inlinifyScripts: ->
		@scripts = @window.document.querySelectorAll('script')
		@inlinifyScript(script) for script in @scripts

	inlinifyScript: (script) ->
		unless script.src then return
		script.innerHTML = @getFileRelativeToDocument script.src 
		script.src = ''

	inlinifyStyles: ->
		@styles = @window.document.querySelectorAll('link[type="text/css"]')
		@inlinifyStyle(style) for style in @styles

	inlinifyStyle: (link) ->
		style = @window.document.createElement('style')
		style.innerHTML = @getFileRelativeToDocument link.href
		link.parentNode.replaceChild style, link

	getFileRelativeToDocument: (p) ->
		fs.readFileSync(path.resolve(path.dirname(@parsedUrl.path), p)).toString()

module.exports = Inlinifier