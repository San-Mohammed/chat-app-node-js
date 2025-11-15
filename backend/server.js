const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});




io.on('connection', (socket) => {
  console.log("new client is online #id", socket.id);
  const rooms = io.sockets.adapter.rooms;
console.log(rooms);
  socket.on("joinRoom", (roomNumber)=> {
    console.log("joined" , roomNumber);

    socket.join("1")
  })

  socket.on("send-message", (message, roomNumber)=> {
    io.emit("receive-message",message)
  })

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});