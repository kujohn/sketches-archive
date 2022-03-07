const cw = 1000;
const ch = 1000;
// const cx = cw/2;
// const cy = ch/2;

class Set {
  constructor(bx, by, max = 10) {
    const x = [];
    const y = [];
    const r = [];

    for (let i = 0; i < max; i++) {
      // start from center
      if (i === 0) {
        x[i] = bx
        y[i] = by
        r[i] = 35
        continue;
      }

      // random
      const nr = random(3, 18)
      const nx = random(nr, bx*2 + nr)
      const ny = random(nr, by*2 + nr)

      // find closest
      let cd = 1000;
      let ci = 0;
      for (let a = 0; a < x.length; a++) {
        const d = dist(nx, ny, x[a], y[a])
        if (d < cd) {
          cd = d
          ci = a
        }
      }

      // calculate new circle
      const cx = x[ci]
      const cy = y[ci]
      const cr = r[ci]
      const a = atan2(ny - cy, nx - cx);

      // ellipse(nx, ny, nr * 2, nr * 2)
      // line(nx, ny, cx, cy)

      x[i] = cx + cos(a) * (cr + nr);
      y[i] = cy + sin(a) * (cr + nr);
      r[i] = nr
    }

    // draw circles
    for (let i = 0; i < max; i++) {
      ellipse(x[i], y[i], r[i] * 2, r[i] * 2)
    }
  }
}

function setup() {
  pixelDensity(1);
  createCanvas(cw, ch, SVG);
  background(255);
  noFill();
  noLoop();
}

function draw() {
  const sec = 4;
  for (let i = 1; i < sec; i++) {
    for (let j = 1; j < sec; j++) {
      const bx = ((cw/sec) * i)
      const by = ((ch/sec) * j)
      new Set(bx, by)
    }
  }

  //save("growth.svg")
}
