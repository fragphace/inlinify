buster = require 'buster'
fs = require 'fs'
Inlinifier = require '../lib/inlinifier'

buster.testCase 'Inlinifier', 
	'scripts':
		'test one simple script': (done) ->
			inlinifier = new Inlinifier __dirname + '/fixture/index.html'
			inlinifier.inlinify =>
				html = fs.readFileSync(__dirname + '/fixture/index.html').toString()
				script = fs.readFileSync(__dirname + '/fixture/jquery.js').toString()
				html = html.replace /\<script.*/, '<script>' + script + '</script>'
				assert inlinifier.content, html
				done()

		'test no script': (done) ->
			inlinifier = new Inlinifier __dirname + '/fixture/noScript.html'
			inlinifier.inlinify =>
				html = fs.readFileSync(__dirname + '/fixture/noScript.html').toString()
				assert inlinifier.content, html
				done()

		'test inline script': (done) ->
			inlinifier = new Inlinifier __dirname + '/fixture/inlineScript.html'
			inlinifier.inlinify =>
				html = fs.readFileSync(__dirname + '/fixture/inlineScript.html').toString()
				assert inlinifier.content, html
				done()