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
const producer = new Producer('esb_queue', config)

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
