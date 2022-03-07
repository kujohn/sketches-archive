const cw = 800;
const ch = 800;

const N = 0;
const NE = 1;
const E = 2;
const SE = 3;
const S = 4;
const SW = 5;
const W = 6;
const NW = 7;

const exists = {};

class Walker {
  constructor(x, y, step) {
    this.x = x;
    this.y = y;
    this.step = step;
  }

  update() {
    const r = Math.floor(random(0, 8));
    const s = this.step;
    switch(r) {
    case N:
      this.y -= s;
      break;
    case NE:
      this.y -= s;
      this.x += s;
      break;
    case E:
      this.x += s;
      break;
    case SE:
      this.y += s;
      this.x += s;
      break;
    case S:
      this.y += s;
      break;
    case SW:
      this.y += s;
      this.x -= s;
      break;
    case W:
      this.x -= s;
      break;
    case NW:
      this.y -= s;
      this.x -= s;
      break;
    default:
    }
  }

  draw() {
    if (exists[this.x] == undefined) {
      exists[this.x] = {}
    }

    if (exists[this.x][this.y]) {
      this.update();
      return
    }

    const s = Math.floor(random(2, 6))
    ellipse(this.x, this.y, s, s);
    const k = Math.floor(random(6, 12))
    ellipse(this.x, this.y, k, k);
    exists[this.x][this.y] = true;
    this.update();
  }
}

const ws = []
function setup() {
  pixelDensity(1);
  createCanvas(cw, ch, SVG);
  background(255);
  noFill();

  for (let x = 0; x < 10; x++) {
    ws.push(new Walker(cw/2, ch/2, 16))
  }
}

function draw() {
  for (let i = 0; i < ws.length; i++) {
    ws[i].draw();
  }

  if (frameCount == 200) {
    noLoop()
    // save("xyz.svg")
  }
}

