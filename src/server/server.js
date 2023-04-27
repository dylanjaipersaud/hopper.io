const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');

const webpackConfig = require('../../webpack.dev.js')

// Create Express server
const app = express();
app.use(express.static('public'));

// Setup Webpack for development
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));

// Server begins listening on port 4444
const server = app.listen(4444);

// Create socket.io server and attach it to the Express server
const io = socketio(server);

io.on('connection', socket => {
    console.log("Connection was made: ", socket.id)
})