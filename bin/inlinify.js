#!/usr/bin/env node 

var InlinifierFactory = require('../lib/inlinifierFactory');
var optimist = require('optimist');
var path = require('path');
var argv = optimist.argv;

var inlinifier = InlinifierFactory.create(argv._[0]);
inlinifier.inlinify(function () {
  console.log(inlinifier.content);
});