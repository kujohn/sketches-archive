const cw = 700;
const ch = 700;

const angleCount = 1

const NORTH = 0
const EAST = 1
const SOUTH = 2
const WEST = 3
const exists = {};

function randomAngle(dir) {
  const a = (Math.floor(random(-angleCount, angleCount)) + 0.5) * 90/angleCount
  switch(dir) {
    case NORTH:
      return (a - 90);
    case EAST:
      return (a);
    case SOUTH:
      return (a + 90);
    case WEST:
      return (a + 180);
  }
}

class Walker {
  constructor(x, y, step, lifetime = 100) {
    this.x = x;
    this.y = y;
    this.step = step;
    this.life = lifetime
  }

  update() {
    const d = Math.floor(random(0,  4))
    const a = randomAngle(d)
    this.nx = this.x + cos(radians(a)) * this.step
    this.ny = this.y + sin(radians(a)) * this.step
    this.life = this.life - 1
  }

  exists() {
    const k = `${this.x}_${this.y}_${this.nx}_${this.ny}`
    if (exists[k]) {
      return true
    }
    exists[k] = true
    return false
  }

  draw() {
    this.update()
    if (this.life <= 0) {
      return
    }
    if (!this.exists()) {
      ellipse(this.x, this.y, this.nx, this.ny)
    }
    this.x = this.nx
    this.y = this.ny
  }
}

const ws = []
function setup() {
  pixelDensity(1);
  createCanvas(cw, ch, SVG);
  background(255);
  noFill();

  for (let x = 0; x < 10; x++) {
    ws.push(new Walker(cw/2, ch/2, 10, 50))
  }
  for (let x = 0; x < 10; x++) {
    ws.push(new Walker(cw/2, ch/2, 20, 10))
  }
  for (let x = 0; x < 20; x++) {
    ws.push(new Walker(cw/2, ch/2, 50, 10))
  }
}

function draw() {
  for (let i = 0; i < ws.length; i++) {
    ws[i].draw();
  }

  if (frameCount == 50) {
    noLoop()
    // save("xyz.svg")
  }
}
