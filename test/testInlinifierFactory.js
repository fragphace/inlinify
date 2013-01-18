var InlinifierFactory, buster;

buster = require('buster');

InlinifierFactory = require('../lib/inlinifierFactory');

buster.testCase('InlinifierFactory', {
  'test throws an exception on invalid url': function() {
    var _this = this;
    return assert.exception(function() {
      return InlinifierFactory.create('foo');
    });
  },
  'create': {
    'test create FileInlinifier on file protocol': function() {
      return assert.equals(InlinifierFactory.create('file:///foo').constructor.name, 'FileInlinifier');
    },
    'test create UrlInlinifier on http protocol': function() {
      return assert.equals(InlinifierFactory.create('http://example.com').constructor.name, 'UrlInlinifier');
    }
  }
});
