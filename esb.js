/*************************
    ┌────────────────────┐
    │ ╔═══╗[SA]201314810 │▒
    │ ╚═╦═╝  @danii_mor  │▒
    └────────────────────┘▒
**************************/

// Modules required
const config = require('./config')
const Redismq = require('./queque')
const { Consumer } = require('redis-smq')
const MongoClient = require('mongodb').MongoClient

let uri = 'mongodb://admin1:admin@cluster0-shard-00-00-k6sn1.mongodb.net:27017,cluster0-shard-00-01-k6sn1.mongodb.net:27017,cluster0-shard-00-02-k6sn1.mongodb.net:27017/Base1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

function Insert (myobj) {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) throw err
    var dbo = client.db('Base1')

    dbo.collection('Base1').insertOne(myobj, function (err, res) {
      if (err) throw err
      console.log('MONGODB>> added', JSON.stringify(myobj))
      client.close()
    })
    console.log('MONGODB>> conection established')
  })
  return true
}

class QuequeConsumer extends Consumer {
  // read the msg request
  consume (message, cb) {
    console.log('ESB>> You have work: ', message)
    Insert(JSON.parse(message))
    cb()
  }
}

// set the queue name
QuequeConsumer.queueName = 'esb_queque'

const consumer = new QuequeConsumer(config, { messageConsumeTimeout: 2000 })
consumer.run()

console.log('ESB>> started')
