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

class QuequeConsumer extends Consumer {
  // read the msg request
  consume (message, cb) {
    console.log('ESB>> You have work: ', message)
    cb()
  }
}

// set the queue name
QuequeConsumer.queueName = 'esb_queque'

const consumer = new QuequeConsumer(config, { messageConsumeTimeout: 2000 })
consumer.run()

console.log('ESB>> started')
