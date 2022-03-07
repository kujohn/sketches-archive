const w = 900;
const h = 700;
const center = new p5.Vector(w/2, h/2)

const fps = 120;
const filename = `test`;

let domFrames
let domCapture
let domCaptureFrames

let captureStart = 0;
let captureEnd = 0;
let captureBuffer = null;
let capturing = false;

let captureImmediately = true;
let captureImmediatelyFrom = 0;
let captureDuration = 100;

function setup() {
  createCanvas(w, h);
  frameRate(fps);
  domFrames = select("#frames")
  domCaptureFrames = select("#duration")
  domCaptureFrames.elt.value = captureDuration
  domCapture = select("#capture")
  domCapture.elt.addEventListener('click', () => {
    captureBuffer = createGraphics(w, h, SVG);
    captureDuration = parseInt(domCaptureFrames.elt.value);
    captureStart = captureImmediatelyFrom + frameCount + 1;
    captureEnd = captureImmediatelyFrom + frameCount + 1 + captureDuration;
  });

  init();
}

function draw() {
  // start capture automatically
  if (captureImmediately) {
    domCapture.elt.click();
    captureImmediately = false;
  }

  // update capturing
  capturing = frameCount >= captureStart && frameCount < captureEnd;
  if (capturing) {
    domCapture.elt.innerHTML = captureEnd - frameCount;
  }

  // update frame count in dom
  domFrames.elt.innerHTML = frameCount

  // actual drawing
  drawer();

  // save
  if (frameCount === captureEnd) {
    captureBuffer.save(filename);
    captureBuffer = null;
    domCapture.elt.innerHTML = "capture"
  }
}

/***************************************/
/************ START DRAWING ************/
/***************************************/

let total = 20;
let balls = []

function init() {
  for (let i = 0; i < total; i++) {
    const x = cos(radians(i*36)) * 100;
    const y = sin(radians(i*36)) * 100;
    const c = createVector(center.x + x, center.y + y);
    const mass = random(0.1, 2);
    const ball = new Bouncer(c, mass);
    balls.push(ball)
  }
}

function drawer() {
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i]

    // apply wind force
    const wx = random(-0.5, 0.5)
    const wy = random(-0.5, 0.5)
    ball.applyForce(createVector(wx, wy))

    // apply gravity
    const g = createVector(0, 0.4)
    // ball.applyForce(g)
    ball.update();
    ball.draw()
  }
}

class Bouncer {
  constructor (start, mass = 0) {
    this.mass = mass;
    this.location = start;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(f) {
    const ff = f.copy()
    ff.div(this.mass)
    this.acceleration.add(f)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }

  checkEdges () {
    const loc = this.location
    if (loc.x > w) {
      this.location.x = width;
      this.velocity.x *= -1;
    } else if (loc.x < 0) {
      this.velocity.x *= -1;
      this.location.x = 0;
    }

    if (loc.y > h) {
      this.velocity.y *= -1;
      this.location.y = h;
    } else if (loc.y < 0) {
      this.velocity.y *= -1;
      this.location.y = 0;
    }
  }

  draw() {
    const mass = this.mass
    const loc = this.location
    if (capturing) {
      captureBuffer.ellipse(loc.x, loc.y, mass * 8, mass * 8)
    }
    ellipse(loc.x, loc.y, mass * 8, mass * 8)
    this.checkEdges();
  }
}
