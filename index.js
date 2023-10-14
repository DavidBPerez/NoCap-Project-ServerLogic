const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// creates 'game' process
const gamePath = path.resolve(__dirname, './game_src/main');
console.log('Game path:', gamePath);

const gameProcess = spawn(gamePath, []);

// tracks messages (data)
gameProcess.stdout.on('data', (data) => {
  const message = data.toString();
  console.log('Received from game:', message);
  io.emit('message-from-game', message);
});

// tracks client (event listeners)
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('start-application', () => {
    console.log('Starting application.');
    gameProcess.stdin.write('start\n');
  });

  socket.on('exit-application', () => {
    console.log('Exiting application.');
    gameProcess.stdin.write('exit\n')
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
