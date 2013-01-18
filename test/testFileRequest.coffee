buster = require 'buster'
server = require './server'
http = require 'http'
fs = require 'fs'
expectationHelper = require './helper/expectation'
FileRequest = require '../lib/fileRequest'

buster.testCase 'FileRequest',
  setUp: ->
    @request = new FileRequest 'file://' + __dirname + '/expectation/blank.html'

  'test get content': (done) ->
    @request.getContent (err, content) =>
      assert.equals content, expectationHelper.getExpectation 'blank'
      done()