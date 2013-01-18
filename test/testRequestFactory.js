var RequestFactory, buster;

buster = require('buster');

RequestFactory = require('../lib/requestFactory');

buster.testCase('RequestFactory', {
  'test throws an exception on invalid url': function() {
    var _this = this;
    return assert.exception(function() {
      return RequestFactory.create('foo');
    });
  },
  'create': {
    'test create FileInlinifier on file protocol': function() {
      return assert.equals(RequestFactory.create('file:///foo').constructor.name, 'FileRequest');
    },
    'test create UrlInlinifier on http protocol': function() {
      return assert.equals(RequestFactory.create('http://example.com').constructor.name, 'WebRequest');
    }
  },
  'create relative': {
    'test file': function() {
      var relative;
      relative = RequestFactory.createRelative('file:///foo/bar/baz', '../');
      return assert.equals(relative.url, 'file:///foo/');
    },
    'test address': function() {
      var relative;
      relative = RequestFactory.createRelative('http://example.com/foo/bar', './style.css');
      return assert.equals(relative.url, 'http://example.com/foo/style.css');
    }
  }
});
