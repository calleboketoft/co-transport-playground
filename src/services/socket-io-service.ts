import * as io from 'socket.io-client'

let socket = io('http://localhost:3000')

export {socket}