/*************************
    ┌────────────────────┐
    │ ╔═══╗[SA]201314810 │▒
    │ ╚═╦═╝  @danii_mor  │▒
    └────────────────────┘▒
**************************/

// Modules required

const config = require('./config')
const { Producer } = require('redis-smq')

// Service parameters
const producer = new Producer('esb_queque', config)

var Queque = /* @class */(function () {
  function Queque () {

  }
  Queque.prototype.ADD = function (msg) {
    return producer.produceMessage(msg, (err) => {
      if (err) {
        return false
      } else {
        return true
      }
    })
  }

  Queque.prototype.CLOSE = function () {
    producer.shutdown()
  }
  return Queque
}())

exports.Queque = Queque


// Modules required
const http = require('http')
const Redismq = require('./queque')

// Service parameters
const host = '127.0.0.1'
const port = '2013'

var queque = new Redismq.Queque()

var esb = http.createServer(function (req, res) {
  // parses to JSON the url request
  var msg = JSON.stringify(req.url)
  // add it to queque
  if (queque.ADD(msg)) {
    res.writeHead(200, { 'Content-Type': 'text/json' })
  } else {
    res.writeHead(404, { 'Content-Type': 'text/json' })
  }
  res.end()
})

// the esb listens for save requests
esb.listen(port, host)

console.log('QUEQUE>> stablished')
