jsdom = require 'jsdom'
fs = require 'fs'
path = require 'path'

class Inlinifier
	constructor: (p) ->
		@path = p
		@content = ''
		@scripts = []
		@styles = []
		@window = null

	inlinify: (callback) ->
		dom = jsdom.jsdom(fs.readFileSync(@path).toString())
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
		fs.readFileSync(path.resolve(path.dirname(@path), p)).toString()

module.exports = Inlinifier