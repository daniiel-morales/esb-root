/*************************
    ┌────────────────────┐
    │ ╔═══╗[SA]201314810 │▒
    │ ╚═╦═╝  @danii_mor  │▒
    └────────────────────┘▒
**************************/

// Modules required
const http = require('http')
const url = require('url')
const { parse } = require('querystring')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

// Service parameters
const host = 'localhost'//process.env.HOST
const port = 2013//process.env.PORT

var esb = http.createServer(function (req, res) {
  // parse REST request
  // req.url -- For who is the message?
  // req.method -- What do you want me to do?
  // msg.jwt -- Need it for access
  // msg.* -- Parameters need it for operate the request


  let msg = ''
  var starts_parameters = req.url.length

  // extracts parameters
  if(req.method == 'GET'){
    msg = url.parse(req.url, true).query
    starts_parameters = req.url.lastIndexOf('?')
  }else
    req.on('data', chunk => {
        msg = parse(chunk.toString())
    })

  if(jwt !== undefined){
    // delete parameters of url and the first backslash
    req.url = req.url.substring(1,starts_parameters).toLowerCase()

    req.on('end', function() {

      var xhr = new XMLHttpRequest();

      if (req.method == 'GET') {
        switch(req.url){
          case 'vehiculo':
            break;
          case 'foto':
            break;
          case 'estado':
            break;
          case 'afiliado':
            break;
          case 'pago':
            break;
          default:
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.write('{err:\'Resource ' + req.url + ' Not Found 404\'}')
        }
      }else if (req.method == 'POST') {
        switch(req.url){
          case 'afiliado':
            break;
          case 'pago':
            break;
          default:
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.write('{err:\'Resource ' + req.url + ' Not Found 404\'}')
        }
      } else {
        // PUT
        switch(req.url){
          case 'vehiculo':
            break;
          case 'afiliado':
            break;
          default:
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.write('{err:\'Resource ' + req.url + ' Not Found 404\'}')
        }
      }
    })
  }else{
    res.writeHead(403, { 'Content-Type': 'application/json' })
    res.write('{err:\'El JWT no es válido o no contiene el scope de este servicio\'}')
  }
  res.end()
})

// the esb listens for save requests
esb.listen(port, host)

console.log('ESB>> started ' + host + ':' + port )
