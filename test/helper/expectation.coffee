fs = require 'fs'
FileInlinifier = require '../../lib/fileInlinifier'
UrlInlinifier = require '../../lib/urlInlinifier'

module.exports = 
	assertUrlEqualsExpectation: (Inlinifier, url, expectationName, done) ->
		inlinifier = new Inlinifier url
		inlinifier.inlinify =>
			assert.equals inlinifier.content, @getExpectation expectationName
			done()

	getExpectation: (name) ->
		fs.readFileSync(__dirname + '/../expectation/' + name + '.html').toString()

	assertFileEqualsExpectation: (name, done) -> 
		@assertUrlEqualsExpectation(
			FileInlinifier, 
			'file://' + __dirname + '/../fixture/' + name + '.html', 
			name, 
			done
		)

	assertWebpageEqualsExpectation: (name, done) ->
		@assertUrlEqualsExpectation(
			UrlInlinifier, 
			'http://127.0.0.1:3128/' + name, 
			name, 
			done
		)
