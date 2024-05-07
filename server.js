const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const studentController = require('./controllers/studentController');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO and pass the server instance
const io = socketIo(server);

// WebSocket event handling
io.on('connection', (socket) => {
  console.log('Client connected');
  console.log('Client connected on port number 3000');
  console.log('Random Number: 222');

  // Send a message to the client-side
  socket.emit('message', 'Welcome to the Student Portal!');

  io.on('disconnect', (socket) => {
    console.log('Client Disconnected');
  });
});

// Make the io object accessible outside
module.exports = { app, server, io };

// Routes
app.use('/', studentController);

// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
