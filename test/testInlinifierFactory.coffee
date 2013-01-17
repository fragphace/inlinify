buster = require 'buster'
InlinifierFactory = require '../lib/inlinifierFactory'

buster.testCase 'Inlinifier',
	'// test throws an exception on invalid url': ->
		assert.exception =>
			new Inlinifier 'foo'