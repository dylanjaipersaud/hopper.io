const Constants = require('../shared/constants.js');
const Player = require('./player.js');

class Game{
    constructor(){
        this.sockets = {};
        this.players = {};
        this.lastUpdateTime = Date.now();
        this.shouldSendUpdate = false;
        setInterval(this.lastUpdateTime.bind(this), 1000 / 60);
    }

    // Adds and saves a new player to the game
    addPlayer(socket, username){
        this.sockets[socket.id] = socket;

        // Generate a random starting point for the player
        const x = 0;
        const y = 0;

        this.players[socket.id] = new Player(socket.id, username, x, y);
    }

    // Remove players from the game
    removePlayer(socket){
        delete this.sockets[socket.id];
        delete this.players[socket.id];
    }
}