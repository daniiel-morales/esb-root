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
const jwt = require('jsonwebtoken')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

// Service parameters
const host = 'localhost'//process.env.HOST
const port = 2013//process.env.PORT

var esb = http.createServer(function (req, res) {
  // parse REST request
  // req_url -- For who is the message?
  // req.method -- What do you want me to do?
  // msg.jwt -- Need it for access
  // msg.* -- Parameters need it for operate the request

  let public_key = ''

  // delete parameters of url and the first backslash
  var req_url = ''
  if(req.method == 'GET')
    req_url = req.url.substring(1,req.url.lastIndexOf('?')).toLowerCase()
  else
    req_url = req.url.substring(1,req.url.length).toLowerCase()

  getParameters(req, msg=> {
    // verify token scope
    if(msg.jwt !== undefined){
      switch(req_url){
        case 'vehiculo':
        case 'foto':
        case 'estado':
          public_key = '-----BEGIN PUBLIC KEY-----'
                        + 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANlQt7nPbeMBOZhL3i5C2b876vwXYlkh'
                        + 'Fm7N6ajoHMc8zHUNSiqg3KFZo7Ywd70jRtgn5TPZqXO5qtmSQ8LsDO8CAwEAAQ=='
                        + '-----END PUBLIC KEY-----'//process.env.KEY_INVENTARIO
          break;
        case 'afiliado':
          public_key = '-----BEGIN PUBLIC KEY-----'
                        + 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANH6lGLWVF9+Sj9HENNUu0n56uTQidbz'
                        + 'nCOJiGuj+GfzGJuAE6j7NODbitnk7v/r3GLYidcwB/gI3u4wuWEdwoMCAwEAAQ=='
                        + '-----END PUBLIC KEY-----'//process.env.KEY_OFICINA
          break;
        case 'pago':
          public_key = '-----BEGIN PUBLIC KEY-----'
                        + 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMzjyQO8QU94G3Q3kmsz2j6bY+kjpTi9'
                        + 'kZMxusk1Jch1qvBSkd2e5beFGKpvck5C/TbokfQJJu5HIaDZkOsyOL0CAwEAAQ=='
                        + '-----END PUBLIC KEY-----'//process.env.KEY_SUBASTA
          break;
        default:
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.write(JSON.stringify({err:'Resource ' + req.url + '.' + req.method + ' Not Found 404'}))
      }

      let opts = {
        algorithms: ["RS256"]
      }

      jwt.verify(msg.jwt, public_key, opts, function(err, decoded) {
        if (err) {
          res.writeHead(403, { 'Content-Type': 'application/json' })
          res.write(JSON.stringify({err:'El JWT no es válido o no contiene el scope de este servicio'}))
          res.end()
        }else{
          //console.log(decoded)
          var xhr = new XMLHttpRequest();

          if (req.method == 'GET') {
            switch(req_url){
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
                res.write(JSON.stringify({err:'Resource ' + req.url + '.' + req.method + ' Not Found 404'}))
            }
            res.end()
          }else if (req.method == 'POST') {
            switch(req_url){
              case 'afiliado':
                break;
              case 'pago':
                break;
              default:
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.write(JSON.stringify({err:'Resource ' + req.url + '.' + req.method + ' Not Found 404'}))
            }
          } else {
            // PUT request
            switch(req_url){
              case 'vehiculo':
                break;
              case 'afiliado':
                break;
              default:
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.write(JSON.stringify({err:'Resource ' + req.url + '.' + req.method + ' Not Found 404'}))
            }
          }
        }
      })
    }else{
      res.writeHead(403, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify({err:'El JWT no es válido o no contiene el scope de este servicio'}))
    }
  })

  req.on('end', function() {
    res.end()
  })
})

// the esb listens for save requests
esb.listen(port, host)

console.log('ESB>> started ' + host + ':' + port )

function getParameters(request, callback){
  // extracts parameters
  if(request.method == 'GET'){
    callback(url.parse(request.url, true).query)
  }else
    request.on('data', chunk => {
        callback(parse(chunk.toString()))
    })
}