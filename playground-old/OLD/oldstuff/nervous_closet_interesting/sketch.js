const w = 800;
const h = 800
let state = [];

const Particles = {
  id: 0,
  x: 1,
  y: 1,
  vx: 1,
  vy: 1,
  size: 6,
  direction: 0,
  idx: 0,
  color: '#ffffff'
};

let Velocity;
let Direction;
let Position;

let all = [
  [
    '#ffc93c',
    '#07689f',
    '#40a8c4',
    '#a2d5f2'
  ],
  [
    '#9ad3bc',
    '#f3eac2',
    '#f5b461',
    '#ec524b'
  ],
  [
    '#000000',
    '#6a097d',
    '#c060a1',
    '#f1d4d4'
  ]
];

let scheme = [...all[0]]

function mouseClicked() {
  scheme = all[int(random(0, all.length))]
}

function setup() {
  createCanvas(w, h);
  noStroke();
  randomSeed(666);
  frameRate(144);
  background(230);

  Velocity = (v, d) => (v + d) / 1.2;
  Direction = (x, y, id) => random(x, y);
  Position = (c, d, max) => (c + d) % max;

  for (let i = 0; i < 1000; i++) {
    let p = Object.create(Particles);
    p.id = i;
    p.x = random(0, w);
    p.y = random(0, h);
    p.idx = i % 4;
    p.size = i % p.size;
    state.push(p);
  }
}

function updateState() {
  state = state.map((p) => {
    return {
      id: p.id,
      x: Position(p.x, p.vx, w),
      y: Position(p.y, p.vy, h),
      vx: Velocity(p.vx, sin(p.direction)),
      vy: Velocity(p.vy, cos(p.direction)),
      direction: Direction(p.x, p.y, p.id),
      size: p.size,
      idx: p.idx
    };
  });
}

function draw() {
  textAlign(CENTER);
  textSize(300);
  fill(230);
  text('TYPE', w/2, h/2);

  updateState();
  //fill(0);
  state.forEach((p) => {
    fill(scheme[p.idx])
    ellipse(p.x, p.y, p.size, p.size);
  });
}
