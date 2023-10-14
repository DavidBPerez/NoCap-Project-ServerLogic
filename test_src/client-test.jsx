// Run on shell while running server to test :)

const io = require('socket.io-client');
const socket = io('http://localhost:5173');

socket.on('connect', () => {
  console.log('Connected to the server.');

  // Simulate starting application
  socket.emit('start-application', (response) => {
    // console.log('Start Message:', response);
  });
  
  // Simulate exiting application
  socket.emit('exit-application', (response) => {
    // console.log('Exit Message:', response);
  });
  
});

// Listen for responses
socket.on('start-application-response', (response) => {
  console.log('Start Application Response:', response);
});

socket.on('exit-application-response', (response) => {
  console.log('Exit Application Response:', response);
});

// You may press ctrl+c to exit client
