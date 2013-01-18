buster = require 'buster'
InlinifierFactory = require '../lib/inlinifierFactory'

buster.testCase 'InlinifierFactory',
	'test throws an exception on invalid url': ->
		assert.exception =>
			InlinifierFactory.create 'foo'

	'create':
		'test create FileInlinifier on file protocol': ->
			assert.equals InlinifierFactory.create('file:///foo').constructor.name, 'FileInlinifier'

		'test create UrlInlinifier on http protocol': ->
			assert.equals InlinifierFactory.create('http://example.com').constructor.name, 'UrlInlinifier'