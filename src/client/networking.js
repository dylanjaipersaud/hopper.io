/*
    Handles the client's connection to the server.
    Handles message delivery to the client.
*/

import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';

const Constants = require('../shared/constants');

// Checks between https or http protocol
const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';

// Creates a new socket for the client in the browser
const socket = io(`${socketProtocol}://${window.location.host}`, {reconnection: false});

// Creates a promise upon client connection attempt
const connectedPromise = new Promise(resolve =>{
    socket.on('connect', () => {
        console.log("Connected to server");
        resolve();
    })
})

// Handles message callbacks upon successful connection
export const connect = onGameOver => (
    connectedPromise.then(() => {
        // Message callback for game updates
        socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);

        // Message callback for game over
        socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);

        // Message callback for client disconnection
        socket.on('disconnect', () => {
            console.log("Disconnected from server")
            document.getElementById('disconnect-modal').classList.remove('hidden');
            document.getElementById('reconnect-button').onClick = () => {
                window.location.reload();
            }
        })
    })
)

// Checks the client's username
export const play = username => {
    socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
}

// 
export const updateDirection = throttle(20, dir => {
    socket.emit(Constants.MSG_TYPES.INPUT, dir);
})