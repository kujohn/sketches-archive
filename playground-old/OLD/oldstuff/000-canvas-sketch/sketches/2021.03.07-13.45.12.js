const canvasSketch = require('canvas-sketch');
const { renderPaths, createPath, pathsToPolylines } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const Random = require('canvas-sketch-util/random');
const Victor = require('victor')

// You can force a specific seed by replacing this with a string value
const defaultSeed = '';

// Set a random seed so we can reproduce this print later
Random.setSeed(Random.getRandomSeed());

const settings = {
  suffix: Random.getSeed(),
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'px'
};

let w
let h

class Bouncer {
  constructor(pos, mass) {
    this.location = pos;
    this.mass = new Victor(mass, mass);
    this.acceleration = new Victor(0, 0);
    this.velocity = new Victor(0, 0);
    this.path;
  }

  applyForce(f) {
    f.clone();
    f.divide(this.mass);
    this.acceleration.add(f)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.acceleration.multiply(new Victor(0, 0))
  }

  checkEdges() {
    const {
      x,
      y
    } = this.location
    if (x > w) {
      this.location.x = w
      this.velocity.x *= -1;
    } else if (x < 0) {
      this.velocity.x *= -1;      
      location.x = 0;
    }

    if (y > h) {
      this.location.y = h
      this.velocity.y *= -1;
    } else if (y < 0) {
      this.velocity.y *= -1;
      this.location.y = 0;
    }
  }

  draw() {
    const {
      location: {
        x,
        y
      },
      mass
    } = this;

    const p = createPath(ctx => {
      ctx.arc(x, y, mass.x * 15, 0, Math.PI*2)
    });
    return p
  }
}

const sketch = (props) => {
  const { width, height, units } = props;

  w = width
  h = height
  const paths = []
  for (let i = 0; i < 10; i++) {
    const b = new Bouncer(new Victor(Random.range(w), Random.range(h)), 10)
    const gravity = new Victor(1000, 1000)
    for (let j = 1; j < 50; j++) {
      b.applyForce(gravity);
      b.update();
      paths.push(b.draw())
      b.checkEdges();
    }
  }

  const ll = pathsToPolylines(paths, {units})

  const margin = 50;
  const box = [margin, margin, width - margin, height - margin]

  const clipped = clipPolylinesToBox(ll, box)

  return props => renderPaths(clipped, {
    ...props,
    lineJoin: 'round',
    lineCap: 'round',
   lineWidth: 1,
    optimize: true
  });
};

canvasSketch(sketch, settings);
