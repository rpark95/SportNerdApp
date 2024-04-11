const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)

import {Server} from 'socket.io'

type PlayerCardProps = {
    key:number,
    name:string
}



const io = new Server(server, {
    cors: {
        origin: '*',//* allows anyone to access the server
    },
})

io.on('connection', (socket) => {
    console.log("connection")
    
    socket.on('init-default-player', ({ key, name }: PlayerCardProps) => {
        socket.broadcast.emit('init-default-player', { key, name })
    })
    
})

server.listen(3001, () => {
    console.log('Server Listening on port 3001')
})