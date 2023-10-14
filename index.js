const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// tracks client activity (event listeners)
io.on('connection', (socket) => {
  console.log('Client connected.\n');

  // creates 'game' process
  const gamePath = path.resolve(__dirname, './game_src/main');
  console.log('Game path:', gamePath);

  const gameProcess = spawn(gamePath, [], { stdio: 'pipe'});

  // tracks game (data)
  gameProcess.stdout.on('data', (data) => {
    const message = data.toString();
    console.log('Received from game:', message);
    io.emit('message-from-game', message);
  });
  
  socket.on('start-application', () => {
    console.log('{Start initiated}');
    gameProcess.stdin.write('start\n');
    
    // Send response
    socket.emit('start-application-response', 'Application started.');
  });

  socket.on('exit-application', () => {
    console.log('{Exit initiated}');
    gameProcess.stdin.write('exit\n')

    // Send response
    socket.emit('exit-application-response', 'Application exited.');
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected.\n');
  });
});

const PORT = process.env.PORT || 5173;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
