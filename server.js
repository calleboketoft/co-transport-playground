var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var port = 3000
var staticDir = './'

app.use(express.static(staticDir))

app.get('/test', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

// Client connected
io.on('connection', (socket) => {
  console.log('a user connected')

  // Incoming message
  socket.on('new message', (msg) => {
    console.log('message: ' + msg)

    // Emit incoming message
    io.emit('new message', msg)
  })

  // Client disconnected
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(port, () => {
  console.log('listening on *:' + port)
})