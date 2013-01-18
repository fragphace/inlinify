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

	'test blank': (done) -> expectationHelper.assertWebpageEqualsExpectation 'blank', done
	'test basic': (done) -> expectationHelper.assertWebpageEqualsExpectation 'basic', done
	'test inline': (done) -> expectationHelper.assertWebpageEqualsExpectation 'inline', done