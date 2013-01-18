fs = require 'fs'
Request = require './request'

class FileRequest extends Request
  getContent: (callback) ->
    callback null, fs.readFileSync(@parsedUrl.path).toString()

module.exports = FileRequest