/*************************
    ┌────────────────────┐
    │ ╔═══╗[SA]201314810 │▒
    │ ╚═╦═╝  @danii_mor  │▒
    └────────────────────┘▒
**************************/

// Modules required
const http = require('http')
const config = require('./config')
const Redismq = require('./queque')
const { Consumer } = require('redis-smq')

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

console.log('stablished')
/*
// the esb operate each request
class QuequeConsumer extends Consumer {
  // read the msg request
  consume (message, cb) {
    console.log('ESB>> You have work: ', message)
    cb()
  }
}

// set the queue name
QuequeConsumer.queueName = 'esb-queque'

const consumer = new QuequeConsumer(config, { messageConsumeTimeout: 2000 })
consumer.run() */
