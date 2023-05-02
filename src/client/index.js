import { connect, play } from './networking';
import { startRendering, stopRendering} from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets } from './assets';
import { initState } from './state';
import { setLeaderboardHidden } from './leaderboard';

// Import CSS for design

// Player buttons
const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
const usernameInput = document.getElementById('username-input');

// Connects to player to the game and instantiates the states
Promise.all([
  // Establish connection to the game
  connect(onGameOver),
  // Gather assets ahead of render
  downloadAssets(),
]).then(() => {
  // Once the player has connected, then place them in the game
  playMenu.classList.remove('hidden');
  usernameInput.focus();
  playButton.onclick = () => {
    play(usernameInput.value);
    playMenu.classList.add('hidden');
    initState();
    startCapturingInput();
    startRendering();
    setLeaderboardHidden(false);
  }
}).catch(console.error);

// Handles what happens if the player has a game over
function onGameOver(){
  stopCapturingInput();
  stopRendering();
  playMenu.classList.remove('hidden');
  setLeaderboardHidden(true);
}