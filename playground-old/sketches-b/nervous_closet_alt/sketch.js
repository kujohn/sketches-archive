const w = 700;
const h = 700
let state = [];

const Particles = {
  id: 0,
  x: 1,
  y: 1,
  vx: 1,
  vy: 1,
  size: 3,
  direction: 0
};

let Velocity;
let Direction;
let Position;

function setup() {
  createCanvas(w, h);
  noStroke();
  randomSeed(666);
  frameRate(144);

  Velocity = (v, d) => (v + d) / 1.2;
  Direction = (x, y, id) => TWO_PI * 2;
  Position = (c, d, max) => (c + d) % max;

  for (let i = 0; i < 1000; i++) {
    let p = Object.create(Particles);
    p.id = i;
    p.x = random(0, w);
    p.y = random(0, h);
    state.push(p);
  }
}

function updateState() {
  state = state.map((p) => {
    return {
      id: p.id,
      x: Position(p.x, p.vx, w),
      y: Position(p.y, p.vx, w),
      vx: Velocity(p.vx, cos(p.direction)),
      vy: Velocity(p.vy, sin(p.direction)),
      direction: Direction(p.x, p.y, p.id),
      size: p.size / 1.08
    };
  });
}

function draw() {
  updateState();
  //background(230);
  //fill(0);
  state.forEach((p) => {
    ellipse(p.x, p.y, p.size, p.size);
  });
}
