const Constants = require('../shared/constants.js');
const Player = require('./player.js');
const applyCollisions = require('./collisions');

class Game {
    constructor() {
        this.sockets = {};
        this.players = {};
        this.lastUpdateTime = Date.now();
        this.shouldSendUpdate = false;
        setInterval(this.update.bind(this), 1000 / 60);
    }

    // Adds and saves a new player to the game
    addPlayer(socket, username) {
        this.sockets[socket.id] = socket;

        // Generate a random starting point for the player
        const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
        const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
        this.players[socket.id] = new Player(socket.id, username, x, y);
    }

    // Remove players from the game
    removePlayer(socket) {
        console.log("Removing: ", socket.id)
        delete this.sockets[socket.id];
        delete this.players[socket.id];
    }

    handleInputX(socket, dirX) {
        if (this.players[socket.id]) {
            console.log("reached game");
            this.players[socket.id].updateX(dirX);
        }
    }

    handleInputY(socket, dirY) {
        if (this.players[socket.id]) {
            console.log("reached game");
            this.players[socket.id].updateY(dirY);
        }
    }

    update() {
        // Calculate the time that has passed
        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;

        // Update each player
        Object.keys(this.sockets).forEach(playerID => {
            const player = this.players[playerID];
            player.update(dt);

            // Apply collisions, give players score for hitting other players
            if (applyCollisions(this.players[playerID], Object.values(this.players))) {
                this.players[socket.id].onDealtDamage();
            }
        });



        // Check if any players are dead 
        Object.keys(this.sockets).forEach(playerID => {
            const socket = this.sockets[playerID];
            const player = this.players[playerID];
            if (player.hp <= 0) {
                socket.emit(Constants.MSG_TYPES.GAME_OVER);
                this.removePlayer(socket);
            }
        });

        // Send a game update to each player every other interval
        if (this.shouldSendUpdate) {
            const leaderboard = this.getLeaderboard();
            Object.keys(this.sockets).forEach(playerID => {
                const socket = this.sockets[playerID];
                const player = this.players[playerID];
                socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
            });
            this.shouldSendUpdate = false;
        }
        else {
            this.shouldSendUpdate = true;
        }
    }

    getLeaderboard() {
        return Object.values(this.players)
            .sort((p1, p2) => p2.score - p1.score)
            .slice(0, 5)
            .map(p => ({ username: p.username, score: Math.round(p.score) }));
    }

    createUpdate(player, leaderboard) {
        const nearbyPlayers = Object.values(this.players).filter(
            p => p !== player && p.distanceTo(player) <= Constants.MAP_SIZE / 2,
        );
        // const nearbyBullets = this.bullets.filter(
        //   b => b.distanceTo(player) <= Constants.MAP_SIZE / 2,
        // );

        return {
            t: Date.now(),
            me: player.serializeForUpdate(),
            others: nearbyPlayers.map(p => p.serializeForUpdate()),
            //   bullets: nearbyBullets.map(b => b.serializeForUpdate()),
            leaderboard,
        };
    }
}

module.exports = Game;