jsdom = require 'jsdom'
path = require 'path'
fs = require 'fs'
url = require 'url'

class Inlinifier
	constructor: (u) ->
		@url = u
		@parsedUrl = url.parse(@url)

	inlinify: (callback) ->
		@getResource (err, res) =>
			dom = jsdom.jsdom(res)
			@window = dom.createWindow()
			@inlinifyScripts()
			@inlinifyStyles()
			@content = dom.doctype.toString()
			@content += @window.document.innerHTML
			callback()

	getResource: (callback) ->
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