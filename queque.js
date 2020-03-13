/*************************
    ┌────────────────────┐
    │ ╔═══╗[SA]201314810 │▒
    │ ╚═╦═╝  @danii_mor  │▒
    └────────────────────┘▒
**************************/

// Modules required
const redis = require('redis')

// Service parameters
const host = '127.0.0.1'
const port = '6379'
const queque = redis.createClient(port, host)

queque.on('connect', function () {
  console.log('connected')
})
