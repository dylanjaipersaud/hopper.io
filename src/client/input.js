import { updateDirection } from './networking';

function onMouseInput(e) {
  handleInput(e.clientX, e.clientY);
}

function onTouchInput(e) {
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function handleInput(x, y) {
  // const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  updateDirection(dir);
}

export function startCapturingInput() {
  var up = false, right = false, down = false, left = false;
  window.addEventListener('keydown', press);
  function press(e) {
    if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */) {
      up = true;
      console.log("Pressed W - up: ", up);
    }
    if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
      right = true;
      console.log("Pressed D - right: ", right);
    }
    if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
      down = true;
      console.log("Pressed S - down: ", down);
    }
    if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */) {
      left = true;
      console.log("Pressed A - left: ", left);
    }
  }
  window.addEventListener('keyup', release);
  function release(e) {
    if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */) {
      up = false;
      console.log("Released W");
    }
    if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
      right = false;
      console.log("Released W");
    }
    if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
      down = false;
      console.log("Released W");
    }
    if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */) {
      left = false;
      console.log("Released W");
    }
  }

  // window.addEventListener('mousemove', onMouseInput);
  // window.addEventListener('click', onMouseInput);
  // window.addEventListener('touchstart', onTouchInput);
  // window.addEventListener('touchmove', onTouchInput);
}

export function stopCapturingInput() {
  // window.removeEventListener('mousemove', onMouseInput);
  // window.removeEventListener('click', onMouseInput);
  // window.removeEventListener('touchstart', onTouchInput);
  // window.removeEventListener('touchmove', onTouchInput);
  window.removeEventListener('keydown', press);
  window.removeEventListener('keyup', release);
}