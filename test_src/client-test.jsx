// Run on shell terminals while running server on console to test :)

const io = require('socket.io-client');
const readline = require('readline');
const serverURL = 'http://localhost:3000';
const socket = io(serverURL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inGame = false;

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

  const startGame = () => {
    inGame = true;
    socket.emit('start-application', (response) => {
      console.log(response);
      presentOptions();
    });
  };

  // @TODO: Optional - Add exit option to return to main menu
  const exitGame = () => {
    inGame = false;
    socket.emit('exit-application', (response) => {
      console.log(response);
      rl.close();
    });
  };

  const startNewJourney = () => {
    socket.emit('start-new-journey', (response) => {
      console.log(response);
    });
  };

  const presentOptions = () => {
    rl.question('Type "New" to start a new journey, or type "exit" to exit... ', (answer) => {
      if (answer.toLowerCase() === 'exit') {
        exitGame();
      } else if (answer.toLowerCase() === 'new') {
        startNewJourney();
      } else {
        // @TODO: Add additional options
      }
    });
  };

  displayWelcome();

  rl.question('Press [Enter] to continue to the introduction... ', () => {
    displayIntroduction();

    rl.question('Press [Enter] to start the game... ', (answer) => {
      startGame();
    });
  });

  rl.on('line', (input) => {
    if (input.toLowerCase() === 'exit' && inGame) {
      exitGame();
    }
  });
});

rl.on('close', () => {
  socket.disconnect();
  console.log('Disconnected from the server.\n');
});

// You may also press ctrl+c to exit client
