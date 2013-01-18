buster = require 'buster'
RequestFactory = require '../lib/requestFactory'

buster.testCase 'RequestFactory',
  'test throws an exception on invalid url': ->
    assert.exception =>
      RequestFactory.create 'foo'

  'create':
    'test create FileInlinifier on file protocol': ->
      assert.equals RequestFactory.create('file:///foo').constructor.name, 'FileRequest'

    'test create UrlInlinifier on http protocol': ->
      assert.equals RequestFactory.create('http://example.com').constructor.name, 'WebRequest'

  'create relative': 
    'test file': ->
      relative = RequestFactory.createRelative 'file:///foo/bar/baz', '../'
      assert.equals relative.url, 'file:///foo/'

    'test address': ->
      relative = RequestFactory.createRelative 'http://example.com/foo/bar', './style.css'
      assert.equals relative.url, 'http://example.com/foo/style.css'