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
    // verify token and scope access
    if(msg.jwt !== undefined){
      switch(req_url){
        case 'vehiculo':
        case 'foto':
        case 'estado':
          public_key = '-----BEGIN PUBLIC KEY-----\n'
                        + 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANlQt7nPbeMBOZhL3i5C2b876vwXYlkh\n'
                        + 'Fm7N6ajoHMc8zHUNSiqg3KFZo7Ywd70jRtgn5TPZqXO5qtmSQ8LsDO8CAwEAAQ==\n'
                        + '-----END PUBLIC KEY-----\n'//process.env.KEY_INVENTARIO
          break;
        case 'afiliado':
          public_key = '-----BEGIN PUBLIC KEY-----\n'
                        + 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANH6lGLWVF9+Sj9HENNUu0n56uTQidbz\n'
                        + 'nCOJiGuj+GfzGJuAE6j7NODbitnk7v/r3GLYidcwB/gI3u4wuWEdwoMCAwEAAQ==\n'
                        + '-----END PUBLIC KEY-----\n'//process.env.KEY_OFICINA
          break;
        case 'pago':
          public_key = '-----BEGIN PUBLIC KEY-----\n'
                        + 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMzjyQO8QU94G3Q3kmsz2j6bY+kjpTi9\n'
                        + 'kZMxusk1Jch1qvBSkd2e5beFGKpvck5C/TbokfQJJu5HIaDZkOsyOL0CAwEAAQ==\n'
                        + '-----END PUBLIC KEY-----\n'//process.env.KEY_SUBASTA
          break;
        default:
          res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
          res.write(JSON.stringify({err:'Resource ' + req.url + '.' + req.method + ' Not Found 404'}))
      }

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

          if (req.method == 'GET') {
            switch(req_url){
              case 'vehiculo':
                access = scope.find(element => element.toLowerCase() == 'vehiculo.get')
                if(access != undefined){
                  // REQUEST API here
                  callAPI(xhr,req.url,msg,req.method, response=>{
                    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    res.write(response)
                    res.end()
                  })
                }else{
                  res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                  res.write(JSON.stringify({err:'vehiculo.get FORBIDDEN'}))
                  res.end()
                }
                break;
              case 'foto':
                access = scope.find(element => element.toLowerCase() == 'foto.get')
                if(access != undefined){
                  // REQUEST API here
                  callAPI(xhr,req.url,msg,req.method, response=>{
                    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    res.write(response)
                    res.end()
                  })
                }else{
                  res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                  res.write(JSON.stringify({err:'foto.get FORBIDDEN'}))
                  res.end()
                }
                break;
              case 'estado':
                access = scope.find(element => element.toLowerCase() == 'estado.get')
                if(access != undefined){
                  // REQUEST API here
                  callAPI(xhr,req.url,msg,req.method, response=>{
                    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    res.write(response)
                    res.end()
                  })
                }else{
                  res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                  res.write(JSON.stringify({err:'estado.get FORBIDDEN'}))
                  res.end()
                }
                break;
              case 'afiliado':
                access = scope.find(element => element.toLowerCase() == 'afiliado.get')
                if(access != undefined){
                  // REQUEST API here
                  callAPI(xhr,req.url,msg,req.method, response=>{
                    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    res.write(response)
                    res.end()
                  })
                }else{
                  res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                  res.write(JSON.stringify({err:'afiliado.get FORBIDDEN'}))
                  res.end()
                }
                break;
              case 'pago':
                access = scope.find(element => element.toLowerCase() == 'pago.get')
                if(access != undefined){
                  // REQUEST API here
                  callAPI(xhr,req.url,msg,req.method, response=>{
                    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    res.write(response)
                    res.end()
                  })
                }else{
                  res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                  res.write(JSON.stringify({err:'pago.get FORBIDDEN'}))
                  res.end()
                }
                break;
              default:
                res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                res.write(JSON.stringify({err:'Resource ' + req.url + '.' + req.method + ' Not Found 404'}))
                res.end()
            }
          }else if (req.method == 'POST') {
            switch(req_url){
              case 'afiliado':
                access = scope.find(element => element.toLowerCase() == 'afiliado.post')
                if(access != undefined){
                  // REQUEST API here
                }else{
                  res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                  res.write(JSON.stringify({err:'afiliado.post FORBIDDEN'}))
                  res.end()
                }
                break;
              case 'pago':
                access = scope.find(element => element.toLowerCase() == 'pago.post')
                if(access != undefined){
                  // REQUEST API here
                }else{
                  res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                  res.write(JSON.stringify({err:'pago.post FORBIDDEN'}))
                  res.end()
                }
                break;
              default:
                res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                res.write(JSON.stringify({err:'Resource ' + req.url + '.' + req.method + ' Not Found 404'}))
                res.end()
            }
          } else {
            // PUT request
            switch(req_url){
              case 'vehiculo':
                access = scope.find(element => element.toLowerCase() == 'vehiculo.put')
                if(access != undefined){
                  // REQUEST API here
                }else{
                  res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                  res.write(JSON.stringify({err:'vehiculo.put FORBIDDEN'}))
                  res.end()
                }
                break;
              case 'afiliado':
                access = scope.find(element => element.toLowerCase() == 'afiliado.put')
                if(access != undefined){
                  // REQUEST API here
                }else{
                  res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                  res.write(JSON.stringify({err:'afiliado.put FORBIDDEN'}))
                  res.end()
                }
                break;
              default:
                res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                res.write(JSON.stringify({err:'Resource ' + req.url + '.' + req.method + ' Not Found 404'}))
                res.end()
            }
          }
        }
      })
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
        callback(parse(chunk.toString()))
    })
}

function callAPI(request, url, params, method, callback){
  request.open(method,'https://proyectosa-aemymiaoda-uc.a.run.app'+url, true)

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  request.setRequestHeader('Access-Control-Allow-Origin', '*')
  request.send(params)
  
  request.onload = () => {
    callback(request.responseText)
  }
}