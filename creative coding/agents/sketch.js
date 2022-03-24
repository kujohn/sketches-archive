const cw = 600;
const ch = 600;

const N = 0;
const NE = 1;
const E = 2;
const SE = 3;
const S = 4;
const SW = 5;
const W = 6;
const NW = 7;

class Walker {
  constructor(x, y, step) {
    this.x = x;
    this.y = y;
    this.step = step;
  }

  draw() {
    ellipse(this.x, this.y, 2, 2);
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
}

const ws = []
function setup() {
  pixelDensity(1)
  createCanvas(cw, ch, SVG);
  background(255);

  noStroke();
  fill(50, 25);
  for (let x = 0; x < 100; x++) {
    ws.push(new Walker(cw/2, ch/2, 6))
  }
}

function draw() {
  for (let i = 0; i < ws.length; i++) {
    ws[i].draw();
  }
  //save("xyz.svg")
}
