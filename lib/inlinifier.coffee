jsdom = require 'jsdom'
path = require 'path'
fs = require 'fs'
url = require 'url'
async = require 'async'
_ = require 'underscore'
RequestFactory = require './requestFactory'

class Inlinifier
	constructor: (u) ->
		@url = u
		@parsedUrl = url.parse(@url)
		@mainRequest = RequestFactory.create @url

	inlinify: (callback) ->
		@mainRequest.getContent (err, res) =>
			dom = jsdom.jsdom(res)
			@window = dom.createWindow()
			@inlinifyScripts =>
				@inlinifyStyles =>
					@content = dom.doctype.toString()
					@content += @window.document.innerHTML
					callback()

	inlinifyScripts: (callback) ->
		@scripts = @window.document.querySelectorAll('script')
		inlinifiers = @scripts.map (script) => _.bind @inlinifyScript, @, script
		async.parallel inlinifiers, callback

	inlinifyScript: (script, callback) ->
		unless script.src
			callback()
			return

		request = RequestFactory.createRelative @url, script.src
		request.getContent (err, res) =>
			script.innerHTML = res
			script.src = ''
			callback err, res

	inlinifyStyles: (callback) ->
		@styles = @window.document.querySelectorAll('link[type="text/css"]')
		inlinifiers = @styles.map (style) => _.bind @inlinifyStyle, @, style
		async.parallel inlinifiers, callback

	inlinifyStyle: (link, callback) ->
		request = RequestFactory.createRelative @url, link.href
		request.getContent (err, res) =>
			style = @window.document.createElement 'style'
			style.innerHTML = res
			link.parentNode.replaceChild style, link
			callback err, res

module.exports = Inlinifier