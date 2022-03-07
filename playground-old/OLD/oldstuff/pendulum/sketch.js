const w = 800;
const h = 800;
let stop = false;

function doubleClicked() {
  save("pendulum.svg")
}

function mouseClicked() {
  stop = !stop;
  if (stop) {
    noLoop();
  } else {
    loop();
  }
}

class Agent {
  constructor (step, radius = 100, size = 50) {
    this.x = w/2;
    this.y = h/2;
    this.px = this.x + radius/2;
    this.py = this.y + radius/2;
    this.rotate = 0;
    this.step = step;
    this.size = size;
    this.radius = radius;
    this.stop = false;
  }

  follow (a) {
    this.ref = a;
    this.update();
  }

  update () {
    this.rotate += this.step;

    if (this.ref) {
      this.x = this.ref.px;
      this.y = this.ref.py;
    }
  }

  draw () {
    this.update();
    const rr = this.rotate
    const x = cos(radians(rr)) * this.radius;
    const y = sin(radians(rr)) * this.radius;
    this.px = this.x + x;
    this.py = this.y + y;

    if (this.size > 0) {
      ellipse(this.px, this.py, this.size);
    }
  }
}

let as

function setup() {
  pixelDensity(1);
  createCanvas(w, h, SVG);
  background(255);
  frameRate(60);
  noFill();

  as = [
    new Agent(1, 150, 0),
    new Agent(-4, 100, 2),
    new Agent(5, 200, 7),
    new Agent(-10, 120, 14),
    new Agent(2, 8, 0),
  ]

  for (let i = 0; i < as.length; i++) {
    if (i >= 1) {
      as[i].follow(as[i-1])
    }
  }
}


function draw() {
  for (let i = 0; i < as.length; i++) {
    as[i].draw();
  }
}
