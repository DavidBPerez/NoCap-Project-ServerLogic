const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const corsOptions = {
  origin: 'https://nocap-project.ethanpeeler.repl.co/', // Client's origin (Still WIP)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

let gameProcess;

io.on('connection', (socket) => {
  console.log('Client connected.\n');

  const gamePath = path.resolve(__dirname, './game_src/main');
  console.log('Game path:', gamePath);

  gameProcess = spawn(gamePath, [], { stdio: 'pipe' });

  gameProcess.stdout.on('data', (data) => {
    const message = data.toString();
    console.log('Received from the game:', message);
    io.emit('message-from-game', message);

    if (message.includes('Exiting game...')) {
      socket.emit('exit-application-response', 'Application exited.'); // Early exit response
    }
  });

  socket.on('display-welcome', (callback) => {
    const welcomeText = `
      Welcome to Complacara Conundrum!

      You are about to embark on an adventure filled with choices
      that will shape yourself and the world around. Your decisions 
      may determine your outcomes and rewards. 

      Are you ready to begin?
    `;
    callback(welcomeText);  // Welcome Client
  });

  socket.on('display-introduction', (callback) => {
    const introText = `
      Introduction:

      You find yourself somewhere on campus doing something important,
      but can't recall. This can lead you anywhere beyond reality or
      imagination depending on your choices ahead. Note: Your actions
      may have consequences or affect your goals; choose carefully.
    `;
    callback(introText);  // Introduce Client
  });

  socket.on('start-application', (callback) => {
    console.log('{Start initiated}');
    gameProcess.stdin.write('start\n');

    callback('Game started.');  // Start Client
  });

  socket.on('exit-application', (callback) => {
    console.log('{Exit initiated}');
    gameProcess.stdin.write('exit\n');

    callback('Exiting game...');  // Exit Client
  });

  socket.on('start-new-journey', (callback) => {
    if (!gameProcess || gameProcess.killed) {
      const gamePath = path.resolve(__dirname, './game_src/main');
      console.log('Game path:', gamePath);

      gameProcess = spawn(gamePath, [], { stdio: 'pipe' });

      // @TODO: Modify for frequent (individual) data inputs
      gameProcess.stdout.on('data', (data) => {
        const message = data.toString();
        console.log('Received from the game:', message);
        io.emit('message-from-game', message);

        if (message.includes('Exiting game...')) {
          socket.emit('exit-application-response', 'Application exited.');
        }
      });
    }

    console.log('{ New Journey initiated}');
    gameProcess.stdin.write('new\n');

    callback('New journey started.');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected.\n');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
