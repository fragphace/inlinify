var express, fs, getViewContent, server;

express = require('express');

server = express();

fs = require('fs');

server.configure(function() {
  server.use(express["static"](__dirname + '/../fixture'));
  return server.use(server.router);
});

getViewContent = function(name) {
  return fs.readFileSync(__dirname + '/../fixture/' + name + '.html').toString();
};

server.get('/blank', function(req, res) {
  return res.send(getViewContent('blank'));
});

server.get('/basic', function(req, res) {
  return res.send(getViewContent('basic'));
});

module.exports = server;
