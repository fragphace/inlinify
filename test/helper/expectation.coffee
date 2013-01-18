fs = require 'fs'
Inlinifier = require '../../lib/inlinifier'

module.exports = 
	assertUrlEqualsExpectation: (url, expectationName, done) ->
		inlinifier = new Inlinifier url
		inlinifier.inlinify =>
			assert.equals inlinifier.content, @getExpectation expectationName
			done()

	getExpectation: (name) ->
		fs.readFileSync(__dirname + '/../expectation/' + name + '.html').toString()

	assertFileEqualsExpectation: (name, done) -> 
		@assertUrlEqualsExpectation(
			'file://' + __dirname + '/../fixture/' + name + '.html', 
			name, 
			done
		)

	assertWebpageEqualsExpectation: (name, done) ->
		@assertUrlEqualsExpectation(
			'http://127.0.0.1:3128/' + name, 
			name, 
			done
		)
