buster = require 'buster'
fs = require 'fs'
http = require 'http'
server = require './server'
expectationHelper = require './helper/expectation'

buster.testCase 'Inlinifier',
  'file': 
    'test basic example': (done) -> expectationHelper.assertFileEqualsExpectation 'basic', done
    'test nothing': (done) -> expectationHelper.assertFileEqualsExpectation 'blank', done
    'test inline': (done) -> expectationHelper.assertFileEqualsExpectation 'inline', done

  'web':
    setUp: ->
      @httpServer = http.createServer server
      @httpServer.listen 3128

    tearDown: ->
      @httpServer.close()

    'test blank': (done) -> expectationHelper.assertWebpageEqualsExpectation 'blank', done
    'test basic': (done) -> expectationHelper.assertWebpageEqualsExpectation 'basic', done
    'test inline': (done) -> expectationHelper.assertWebpageEqualsExpectation 'inline', done