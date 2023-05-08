const Constants = require('../shared/constants.js');
const Player = require('./player.js');

class Game{
    constructor(){
        this.sockets = {};
        this.players = {};
        this.lastUpdateTime = Date.now();
        this.shouldSendUpdate = false;
        setInterval(this.update.bind(this), 1000 / 60);
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

    handleInput(socket){
        console.log(socket);
    }

    update(){
        // Calculate the time that has passed
        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;

        // Update each player


        // Check if any players are dead 
        Object.keys(this.sockets).forEach(playerID =>{
            const socket = this.sockets[playerID];
            const player = this.players[playerID];
            // if()
        });

        // Send a game update to each player every other interval
        if(this.shouldSendUpdate){
            const leaderboard = this.getLeaderboard();
            Object.keys(this.sockets).forEach(playerID => {
                const socket = this.sockets[playerID];
                const player = this.players[playerID];
                socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
            });
            this.shouldSendUpdate = false;
        }
        else{
            this.shouldSendUpdate = true;
        }
    }

    getLeaderboard(){
        return Object.values(this.players)
            .sort((p1, p2) => p2.score - p1.score)
            .slice(0, 5)
            .map(p => ({username: p.username, score: Math.round(p.score)}));
    }
}

module.exports = Game;