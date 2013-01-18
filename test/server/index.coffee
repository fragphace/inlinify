express = require 'express'
server = express()
fs = require 'fs'

server.configure ->
	server.use express.static __dirname + '/../fixture'
	server.use server.router

getViewContent = (name) ->
	fs.readFileSync(__dirname + '/../fixture/' + name + '.html').toString()

server.get '/blank', (req, res) -> res.send getViewContent 'blank'
server.get '/basic', (req, res) -> res.send getViewContent 'basic'
server.get '/inline', (req, res) -> res.send getViewContent 'inline'

module.exports = server