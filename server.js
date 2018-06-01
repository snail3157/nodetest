const http = require('http')
const path = require('path')
const fs = require('fs')
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
}).listen(9096)
console.log('node run localhost:9096')