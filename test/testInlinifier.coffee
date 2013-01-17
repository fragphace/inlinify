buster = require 'buster'
fs = require 'fs'
Inlinifier = require '../lib/inlinifier'

buster.testCase 'Inlinifier', 
	'test basic example': (done) ->
			inlinifier = new Inlinifier __dirname + '/fixture/index.html'
			inlinifier.inlinify =>
				html = fs.readFileSync(__dirname + '/fixture/index.html').toString()
				script = fs.readFileSync(__dirname + '/fixture/script.js').toString()
				css = fs.readFileSync(__dirname + '/fixture/style.css').toString()
				html = html.replace /\<script.*/, '<script>' + script + '</script>'
				html = html.replace /\<link.*/, '<style>' + css + '</style>'
				assert.equals inlinifier.content, html
				done()

	'test nothing': (done) ->
		inlinifier = new Inlinifier __dirname + '/fixture/nothing.html'
		inlinifier.inlinify =>
			html = fs.readFileSync(__dirname + '/fixture/nothing.html').toString()
			assert.equals inlinifier.content, html
			done()

	'test inline': (done) ->
		inlinifier = new Inlinifier __dirname + '/fixture/inline.html'
		inlinifier.inlinify =>
			html = fs.readFileSync(__dirname + '/fixture/inline.html').toString()
			assert.equals inlinifier.content, html
			done()