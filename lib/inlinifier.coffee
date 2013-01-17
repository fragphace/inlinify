jsdom = require 'jsdom'
fs = require 'fs'
path = require 'path'

class Inlinifier
	constructor: (p) ->
		@path = p
		@content = ''
		@scripts = []

	inlinify: (callback) ->
		jsdom.env
			html: fs.readFileSync(@path).toString()
			done: (err, window) =>
				@scripts = window.document.querySelectorAll('script')
				@inlinifyScripts()
				@content = window.document.innerHTML
				callback()

	inlinifyScripts: ->
		@inlinifyScript(script) for script in @scripts

	inlinifyScript: (script) ->
		unless script.src then return
		scriptPath = path.resolve path.dirname(@path), script.src
		scriptContent = fs.readFileSync(scriptPath).toString()
		script.src = ''
		script.innerHTML = scriptContent

module.exports = Inlinifier