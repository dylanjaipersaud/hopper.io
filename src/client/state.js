import { updateLeaderboard } from './leaderboard';

// Delays the current state of the client from the server
// to make gameplay smoother
const RENDER_DELAY = 100;

const gameUpdates = [];
let gameStart = 0;
let firstServerTimestamp = 0;

// Initializes the game state for the client 
export function initState() {
    gameStart = 0;
    firstServerTimestamp = 0;
}

// Updates and logs the game
export function processGameUpdate(update){
    if(!firstServerTimestamp){
        firstServerTimestamp = update.t;
        gameStart = Date.now();
    }
    gameUpdates.push(update);

    updateLeaderboard(update.leaderboard);

    // Maintain only one game update before current server time
    const base = getBaseUpdate();
    if(base > 0){
        gameUpdates.splice(0, base);
    }
}

// Gets the current server time with timestamp and delay accounted for
function currentServerTime(){
    return firstServerTimestamp + (Date.now() - gameStart) - RENDER_DELAY;
}

// Returns the index of the base update (the update before a new update
// is processed), or -1 if there is none
function getBaseUpdate(){
    const serverTime = currentServerTime();
    for(let i = gameUpdates.length - 1; i >= 0; i--){
        if(gameUpdates[i].t <= serverTime){
            return i;
        }
    }
    return -1;
}

