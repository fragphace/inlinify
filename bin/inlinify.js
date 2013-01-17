#!/usr/bin/env node 

var Inlinifier = require('../lib/inlinifier');
var optimist = require('optimist');
var path = require('path');
var argv = optimist.argv;

var inlinifier = new Inlinifier(path.resolve(process.cwd(), argv._[0]));
inlinifier.inlinify(function () {
  console.log(inlinifier.content);
});