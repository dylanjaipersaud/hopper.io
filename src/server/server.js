const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');

const Constants = require('../shared/constants.js');
const Game = require('./game.js');
const webpackConfig = require('../../webpack.dev.js');

// Create Express server
const app = express();
app.use(express.static('public'));

// Setup Webpack for development
// const compiler = webpack(webpackConfig);
// app.use(webpackDevMiddleware(compiler));
if (process.env.NODE_ENV === 'development') {
    // Setup Webpack for development
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
  } else {
    // Static serve the dist/ folder in production
    app.use(express.static('dist'));
  }

// Server begins listening on port 4444
const server = app.listen(4444, function(){
    console.log('Server running on port 4444');
});
// const server = app.listen(4444);

// Create socket.io server and attach it to the Express server
const io = socketio(server);

// Listens for socket.io connections
io.on('connection', socket => {
    console.log("Connection was made: ", socket.id);

    socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
    socket.on(Constants.MSG_TYPES.INPUT, handleInput);
    socket.on('disconnect', onDisconnect);
})

// Setup the game
const game = new Game();

// Handle client connection to the game
function joinGame(username){
    game.addPlayer(this, username);
}

// Handle client input
function handleInput(input){
    game.handleInput(this, input);
}

// Handle client disconnect
function onDisconnect(){
    game.removePlayer(this);
}