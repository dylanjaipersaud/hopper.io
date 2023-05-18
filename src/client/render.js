import { debounce } from "throttle-debounce";
import { getAsset } from "./assets";
import { getCurrentState } from "./state";

const Constants = require('../shared/constants');

const { PLAYER_RADIUS, PLAYER_MAX_HP, MAP_SIZE } = Constants;

// Set the canvas context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext("2d");
setCanvasDimensions();

// Sets the dimensions of the canvas according to screen size
function setCanvasDimensions(){
    const scaleRatio = Math.max(1, 800 / window.innerWidth);
    canvas.width = scaleRatio * window.innerWidth;
    canvas.height = scaleRatio * window.innerHeight;
}

// Checks if the player resizes their screen
window.addEventListener('resize', debounce(40, setCanvasDimensions()));

let animationFrameRequestId;

function render(){
    const { me, others } = getCurrentState();

    if(me){
        renderBackground(me.x, me.y);

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);


        renderPlayer(me, me);
        onPlayerMovement();
        others.forEach(renderPlayer.bind(null, me));
    }

    animationFrameRequestId = requestAnimationFrame(render);
}

function renderBackground(x, y){
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  const backgroundGradient = ctx.createRadialGradient(
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2,
  );
  backgroundGradient.addColorStop(0, 'cyan');
  backgroundGradient.addColorStop(1, 'green');
  ctx.fillStyle = backgroundGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderPlayer(me, player){
    const { x, y } = player;
    const canvasX = canvas.width / 2 + x - me.x;
    const canvasY = canvas.height / 2 + y - me.y;

    ctx.save();
    ctx.translate(canvasX, canvasY);
    // ctx.rotate(-direction);
    ctx.drawImage(
      getAsset('frog_idle_1.png'),
      -PLAYER_RADIUS,
      -PLAYER_RADIUS,
      PLAYER_RADIUS * 2,
      PLAYER_RADIUS * 2,
    );
    ctx.restore();

    // Draw health bar
  ctx.fillStyle = 'white';
  ctx.fillRect(
    canvasX - PLAYER_RADIUS,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2,
    2,
  );
  ctx.fillStyle = 'red';
  ctx.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
    2,
  );
}

function onPlayerMovement(){
  if(up){
    console.log("Rendering UP");
  }
}

function renderMainMenu() {
    const t = Date.now() / 7500;
    const x = MAP_SIZE / 2 + 800 * Math.cos(t);
    const y = MAP_SIZE / 2 + 800 * Math.sin(t);
    renderBackground(x, y);
  
    // Rerun this render function on the next frame
    animationFrameRequestId = requestAnimationFrame(renderMainMenu);
  }
  
  animationFrameRequestId = requestAnimationFrame(renderMainMenu);
  
  // Replaces main menu rendering with game rendering.
  export function startRendering() {
    cancelAnimationFrame(animationFrameRequestId);
    animationFrameRequestId = requestAnimationFrame(render);
  }
  
  // Replaces game rendering with main menu rendering.
  export function stopRendering() {
    cancelAnimationFrame(animationFrameRequestId);
    animationFrameRequestId = requestAnimationFrame(renderMainMenu);
  }