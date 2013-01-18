jsdom = require 'jsdom'
path = require 'path'
fs = require 'fs'
url = require 'url'
async = require 'async'
_ = require 'underscore'

class Inlinifier
	constructor: (u) ->
		@url = u
		@parsedUrl = url.parse(@url)

	inlinify: (callback) ->
		@getResource (err, res) =>
			dom = jsdom.jsdom(res)
			@window = dom.createWindow()
			@inlinifyScripts =>
				@inlinifyStyles =>
					@content = dom.doctype.toString()
					@content += @window.document.innerHTML
					callback()

	getResource: (callback) ->
		callback()

	getRelativeResource: (url, callback) ->
		callback()

	inlinifyScripts: (callback) ->
		@scripts = @window.document.querySelectorAll('script')
		inlinifiers = @scripts.map (script) => _.bind @inlinifyScript, @, script
		async.parallel inlinifiers, callback

	inlinifyScript: (script, callback) ->
		unless script.src
			callback()
			return
		@getRelativeResource script.src, (err, res) =>
			script.innerHTML = res
			script.src = ''
			callback err, res

	inlinifyStyles: (callback) ->
		@styles = @window.document.querySelectorAll('link[type="text/css"]')
		inlinifiers = @styles.map (style) => _.bind @inlinifyStyle, @, style
		async.parallel inlinifiers, callback

	inlinifyStyle: (link, callback) ->
		@getRelativeResource link.href, (err, res) =>
			style = @window.document.createElement 'style'
			style.innerHTML = res
			link.parentNode.replaceChild style, link
			callback err, res

module.exports = Inlinifier