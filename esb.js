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
const host = '0.0.0.0' //process.env.HOST
const port = 80//process.env.PORT

var esb = http.createServer(function (req, res) {
  // parse REST request
  // req_url -- For who is the message?
  // req.method -- What do you want me to do?
  // msg.jwt -- Need it for access
  // msg.* -- Parameters need it for operate the request
  let body = ''
  let public_key = ''
  let API = ''
  // delete parameters of url and the first backslash
  var req_url = ''
  if(req.method == 'GET')
    req_url = req.url.substring(1,req.url.lastIndexOf('?')).toLowerCase()
  else
    req_url = req.url.substring(1,req.url.length).toLowerCase()

  getParameters(req, msg=> {
    
    if(req.method !== 'GET'){
      body = msg
      msg = parse(msg)
    }
    // verify token and scope access
    if(msg.jwt !== undefined){
      switch(req_url){
        case 'vehiculo':
        case 'foto':
        case 'estado':
        case 'afiliado':
        case 'pago':
          public_key = '-----BEGIN PUBLIC KEY-----\n'
                      + 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOp7P/J9U+6VN+BQDcIWyzvMPVnqmRz5~z6HNUfcDOsSEk2egtxuBBgAF75OlLxMXi/KyNlb5sNy5qIxrTEv8IYMCAwEAAQ=='//process.env.PUBLIC_KEY
                      + '\n-----END PUBLIC KEY-----'

          public_key = public_key.split('~').join('\n')

          let opts = {
            algorithms: ['RS256']
          }
    
          jwt.verify(msg.jwt, public_key, opts, function(err, decoded) {
            if (err) {
              res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
              res.write(JSON.stringify({err:'El JWT no es válido o no contiene el scope de este servicio'}))
              res.end()
            }else{
              const scope = JSON.parse(decoded.scope)
              let access = ''
              var xhr = new XMLHttpRequest();
              let exists = true
              if (req.method == 'GET') {
                switch(req_url){
                  case 'vehiculo':
                  case 'foto':
                  case 'estado':
                    // URL INVENTARIO
                    API = 'https://proyectosa-aemymiaoda-uc.a.run.app'//process.env.URL_INVENTARIO
                    break;
                  case 'afiliado':
                    // URL OFICINA
                    API = 'https://proyectosaoficina-aemymiaoda-uc.a.run.app'//process.env.URL_OFICINA
                    break;
                  case 'pago':
                    // URL SUBASTA
                    API = 'http://subasta-online.eastus.azurecontainer.io'//process.env.URL_SUBASTA
                    break;
                  default:
                    exists = false
                }
              }else if (req.method == 'POST') {
                switch(req_url){
                  case 'afiliado':
                  case 'pago':
                    // URL OFICINA
                    API = 'https://proyectosaoficina-aemymiaoda-uc.a.run.app'//process.env.URL_OFICINA
                    break;
                  default:
                    exists = false
                }
              } else {
                // PUT request
                switch(req_url){
                  case 'vehiculo':
                    // URL INVENTARIO
                    API = 'https://proyectosa-aemymiaoda-uc.a.run.app'//process.env.URL_INVENTARIO
                    break;
                  case 'afiliado':
                    // URL OFICINA 
                    API = 'https://proyectosaoficina-aemymiaoda-uc.a.run.app'//process.env.URL_OFICINA
                    break;
                  default:
                    exists = false
                }
              }
              if(exists){
                access = scope.find(element => element.toLowerCase() == req_url + '.' + req.method.toLowerCase())
                if(access != undefined){
                  // REQUEST API here
                  callAPI(API, xhr, req.url, body, req.method, response=>{
                    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    res.write(response)
                    res.end()
                  })
                }else{
                  res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                  res.write(JSON.stringify({err:req_url + '.' + req.method.toLowerCase() + ' FORBIDDEN'}))
                  res.end()
                }
              }else{
                res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                res.write(JSON.stringify({err:'Resource ' + req_url + '.' + req.method.toLowerCase() + ' Not Found 404'}))
                res.end()
              }
            }
          })
          break;
        default:
          res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
          res.write(JSON.stringify({err:'Resource ' + req_url + '.' + req.method.toLowerCase() + ' Not Found 404'}))
          res.end()
      }
    }else{
      res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
      res.write(JSON.stringify({err:'El JWT no es válido o no contiene el scope de este servicio'}))
      res.end()
    }
  })
})

// the esb listens for save requests
esb.listen(port, host)

console.log('ESB>> started')

function getParameters(request, callback){
  // extracts parameters
  if(request.method == 'GET'){
    callback(url.parse(request.url, true).query)
  }else
    request.on('data', chunk => {
        callback(chunk.toString())
    })
}

function callAPI(API, request, url, params, method, callback){
  request.open(method,API+url, true)

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  request.setRequestHeader('Access-Control-Allow-Origin', '*')
  request.send(params)
  
  request.onload = () => {
    callback(request.responseText)
  }
}