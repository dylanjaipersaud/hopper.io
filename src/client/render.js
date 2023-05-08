import { debounce } from "throttle-debounce";
import { getAsset } from "./assets";
import { getCurrentState } from "./state";

const Constraints = require('../shared/constants');

const { PLAYER_RADIUS, PLAYER_MAX_HP, MAP_SIZE } = Constants;

// Set the canvas context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext("2d");
setCanvasDimensions();

// Sets the dimensions of the canvas according to screen size
function setCanvasDimensions(){
    const scaleRatio = Math.max(1, 800 / window.innerWidth);
    canvas.width = scaleRatio * window.innerWidth;
    canvas.height = scaleRatio * window/innerHeight;
}

// Checks if the player resizes their screen
window.addEventListener('resize', debounce(40, setCanvasDimensions()));

let animationFrameRequestId;

function render(){
    
}
