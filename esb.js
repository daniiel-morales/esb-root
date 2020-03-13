/*************************
    ┌────────────────────┐
    │ ╔═══╗[SA]201314810 │▒
    │ ╚═╦═╝  @danii_mor  │▒
    └────────────────────┘▒
**************************/

// Modules required
const http = require('http')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
var url = require('url')

// Service parameters
const host = '127.0.0.1'
const port = '2013'

var esb = http.createServer(function (req, res) {
  // parse REST message
  // msg.speaker -- Who sends me the message?
  // msg.type -- What do you want me to do?
  // msg.token -- Need it for access
  // msg.* -- Parameters need it for operate the request
  var msg = url.URL(req.url, true).query
  var xhr
  switch (msg.speaker) {
    default:
      // sample
      xhr = new XMLHttpRequest()
      // xhr.open('POST', 'http:// + host + :14810/0', true)
      xhr.send()
      break
  }
  // res.writeHead(200, { 'Content-Type': 'text/json' })
  res.end()
})

// the server order listens on port
esb.listen(port, host)
