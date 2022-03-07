const cw = 700;
const ch = 1000;


function setup() {
  pixelDensity(1);
  createCanvas(cw, ch, SVG);
  background(255);
  noFill();
  ellipseMode(RADIUS);
  rectMode(RADIUS);
  fill(255);
  frameRate(800)
}

const minR = 10;
const maxR = 50;
const circles = [];

class Circle {
  constructor(o) {
    this.x = o.x
    this.y = o.y
    this.r = o.r


    ellipse(this.x, this.y, this.r)
    for (let r = this.r - 5; r > 0; r = r - 5) {
      ellipse(this.x, this.y, r)
    }
  }
}

function doubleClicked() {
  save('packed.svg')
}

function draw() {
  let intersect = false
  const nx = random(maxR, cw - maxR);
  const ny = random(maxR, ch - maxR);

  for (let nr = maxR; nr > minR; nr--) {
    for (let i = 0; i < circles.length; i++) {
      const {
        x: sx,
        y: sy,
        r: sr
      } = circles[i]

      const d = dist(nx, ny, sx, sy)
      intersect = d < sr + nr
      if (intersect) {
        break;
      }
    }

    if (!intersect) {
      const s = {
        x: nx,
        y: ny,
        r: nr
      }
      circles.push(new Circle(s))
      break;
    }
  }

}
