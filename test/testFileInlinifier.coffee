buster = require 'buster'
fs = require 'fs'
expectationHelper = require './helper/expectation'

buster.testCase 'FileInlinifier', 
	'test basic example': (done) ->	expectationHelper.assertFileEqualsExpectation 'basic', done
	'test nothing': (done) ->	expectationHelper.assertFileEqualsExpectation 'blank', done
	'test inline': (done) -> expectationHelper.assertFileEqualsExpectation 'inline', done