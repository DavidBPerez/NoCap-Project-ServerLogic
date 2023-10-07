const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Define the path to your game executable
const gamePath = path.resolve(__dirname, './game_src/main');
console.log('Game path:', gamePath);

// Start the game process when the server starts
const gameProcess = spawn(gamePath, []);

gameProcess.stdout.on('data', (data) => {
  const message = data.toString();
  console.log('Received from game:', message);
  io.emit('message-from-game', message);
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
