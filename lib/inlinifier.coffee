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
		html = fs.readFileSync(@path).toString()
		dom = jsdom.jsdom html
		@window = dom.createWindow()
		@scripts = @window.document.querySelectorAll('script')
		@inlinifyScripts()
		@styles = @window.document.querySelectorAll('link[type="text/css"]')
		@inlinifyStyles()
		@content = dom.doctype.toString()
		@content += @window.document.innerHTML
		callback()

	inlinifyScripts: ->
		@inlinifyScript(script) for script in @scripts

	inlinifyScript: (script) ->
		unless script.src then return
		scriptPath = path.resolve path.dirname(@path), script.src
		scriptContent = fs.readFileSync(scriptPath).toString()
		script.src = ''
		script.innerHTML = scriptContent

	inlinifyStyles: ->
		@inlinifyStyle(style) for style in @styles

	inlinifyStyle: (style) ->
		stylePath = path.resolve path.dirname(@path), style.href
		styleContent = fs.readFileSync(stylePath).toString()
		node = @window.document.createElement('style')
		node.innerHTML = styleContent
		style.parentNode.replaceChild node, style

module.exports = Inlinifier