buster = require 'buster'
server = require './server'
http = require 'http'
fs = require 'fs'
expectationHelper = require './helper/expectation'
WebRequest = require '../lib/webRequest'

port = 3128
baseUrl = 'http://127.0.0.1:' + port

buster.testCase 'WebRequest',
	setUp: ->
		@httpServer = http.createServer server
		@httpServer.listen port
		@request = new WebRequest baseUrl + '/blank'

	tearDown: ->
		@httpServer.close()

	'test get content': (done) ->
		@request.getContent (err, content) =>
			assert.equals content, expectationHelper.getExpectation 'blank'
			done()