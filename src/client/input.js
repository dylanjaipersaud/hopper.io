import { updateDirectionX, updateDirectionY } from './networking';

var up = false, right = false, down = false, left = false;

function press(e) {
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */) {
    up = true;
    console.log("Pressed W - up: ", up);
    updateDirectionX(10);
  }
  else if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
    right = true;
    console.log("Pressed D - right: ", right);
    updateDirectionY(10);
  }
  else if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
    down = true;
    console.log("Pressed S - down: ", down);
    updateDirectionX(-10);
  }
  else if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */) {
    left = true;
    console.log("Pressed A - left: ", left);
    updateDirectionY(-10);
  }

  // handleInput();
}

function release(e) {
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */) {
    up = false;
    console.log("Released W - up: ", up);
  }
  else if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
    right = false;
    console.log("Released D - right: ", right);
  }
  else if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
    down = false;
    console.log("Released S - down: ", down);
  }
  else if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */) {
    left = false;
    console.log("Released A - left: ", left);
  }
}

function handleInput() {
  // const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  const dir = 10;
  updateDirection(dir);
}

export function startCapturingInput() {
  window.addEventListener('keydown', press);
  window.addEventListener('keyup', release);
}

export function stopCapturingInput() {
  window.removeEventListener('keydown', press);
  window.removeEventListener('keyup', release);
}