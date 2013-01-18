buster = require 'buster'
fs = require 'fs'
http = require 'http'
server = require './server'
UrlInlinifier = require '../lib/urlInlinifier'
expectationHelper = require './helper/expectation'

buster.testCase 'UrlInlinifier',
	setUp: ->
		@httpServer = http.createServer server
		@httpServer.listen 3128

	tearDown: ->
		@httpServer.close()

	'test get resource': (done) ->
		urlInlinifier = new UrlInlinifier 'http://127.0.0.1:3128/blank'
		urlInlinifier.getResource (err, res) =>
			assert.equals res, expectationHelper.getExpectation 'blank'
			done()

	'test blank': (done) ->
		inlinifier = new UrlInlinifier 'http://127.0.0.1:3128/blank'
		inlinifier.inlinify ->
			assert.equals inlinifier.content, fs.readFileSync(__dirname + '/expectation/blank.html').toString()
			done()