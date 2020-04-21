/*************************
    ┌────────────────────┐
    │ ╔═══╗[SA]201314810 │▒
    │ ╚═╦═╝  @danii_mor  │▒
    └────────────────────┘▒
**************************/

// Modules required
const http = require('http')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

// Service parameters
const host = process.env.HOST
const port = process.env.PORT

var esb = http.createServer(function (req, res) {
  // parse REST request
  // req.url -- For who is the message?
  // req.method -- What do you want me to do?
  // msg.token -- Need it for access
  // msg.* -- Parameters need it for operate the request

  var msg = ''
  req.on('data', function(data) {
    msg = JSON.stringify(JSON.parse(data))
  })

  if (req.method == 'GET') {
    switch(req.urltoLowerCase()){
      case '/vehiculo':
        break;
      case '/foto':
        break;
      case '/estado':
        break;
      case '/afiliado':
        break;
      case '/pago':
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.write('{err:\'Resource ' + req.url + ' Not Found 404\'}')
    }
  }else if (req.method == 'POST') {
    switch(req.urltoLowerCase()){
      case '/afiliado':
        break;
      case '/pago':
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.write('{err:\'Resource ' + req.url + ' Not Found 404\'}')
    }
  } else {
    // PUT
    switch(req.urltoLowerCase()){
      case '/vehiculo':
        break;
      case '/afiliado':
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.write('{err:\'Resource ' + req.url + ' Not Found 404\'}')
    }
  }

  req.on('end', function() {
    res.end()
  })

})

// the server order listens on port
esb.listen(port, host)
