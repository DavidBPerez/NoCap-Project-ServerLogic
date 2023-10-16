// Run on shell while running server to test :)

const io = require('socket.io-client');
const readline = require('readline');
const serverURL = 'http://localhost:3000';
const socket = io(serverURL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.on('connect', () => {
  console.log('Connected to the server.');

  const displayWelcome = () => {
    socket.emit('display-welcome', (response) => {
      console.log(response);
    });
  };
  
  const displayIntroduction = () => {
    socket.emit('display-introduction', (response) => {
      console.log(response);
    });
  };
  
  // @TODO: Optional Requirement - Include skippable tutorial
  
  const startGame = () => {
    socket.emit('start-application', (response) => {
      console.log(response);
    });
  };
  
  const exitGame = () => {
    socket.emit('exit-application', (response) => {
      console.log(response);
      rl.close();
    });
  };
  
  displayWelcome();
  
  rl.question('Press [Enter] to continue to the introduction... ', () => {
    displayIntroduction();
    
    rl.question('Press [Enter] to start the game or type "exit" to exit... ', (answer) => {
      if (answer.toLowerCase() === 'exit') {
        exitGame();
      } else {
        startGame();

        rl.question('Press [Enter] to exit the game... ', (answer) => {
          exitGame();
        });
      }
    });
  });
});

rl.on('close', () => {
  socket.disconnect();
  console.log('Disconnected from the server.');
});

// You may also press ctrl+c to exit client
