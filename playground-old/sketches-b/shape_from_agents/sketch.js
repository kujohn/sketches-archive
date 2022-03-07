const cw = 800;
const ch = 800;
const cx = cw/2;
const cy = ch/2;

const NORTH = 0
const EAST = 1
const SOUTH = 2
const WEST = 3

const angleCount = 1
const defaultLife = 10

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
  constructor(x, y, step, lifetime = defaultLife) {
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

  draw() {
    this.update()
    if (this.life <= 0) {
      return
    }
    line(this.x, this.y, this.nx, this.ny)
    this.x = this.nx
    this.y = this.ny
  }
}

const ws = [];
const res = 50;
const size = 300;
function setup() {
  pixelDensity(1);
  createCanvas(cw, ch, SVG);
  background(255);
  noFill();
  translate(cx, cy);

  const angle = radians(360/res);
  for (let i = 0; i < res; i++) {
    const x = cos(angle*i) * size;
    const y = sin(angle*i) * size;
    ws.push(new Walker(x, y, 6));
  }
}

function draw() {
  for (let x = 0; x < ws.length; x++) {
    ws[x].draw();
  }

  if (frameCount >= defaultLife) {
    noLoop();
  }
  
  // save("xyz.svg")
}
