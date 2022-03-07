const tiles = 30;
const w = 600;
const h = 600

function setup() {
  pixelDensity(1)
  createCanvas(w, h, SVG);
  noFill();
  noLoop();
}

function doubleClicked() {
  save("xyz.svg")
}

function draw() {
  for (let gy = 0; gy < tiles; gy++) {
    for (let gx = 0; gx < tiles; gx++) {
      const toggle = Math.floor(random(2))
      const px = w/tiles*gx + tiles;
      const py = h/tiles*gy + tiles;
      const pxx = px-w/tiles;
      const pyy = py-h/tiles;
      switch (toggle) {
      case 0:
        circle(px, py, 3)
        circle(pxx, pyy, 7)
        break;
      case 1:
        circle(pxx, pyy, 5)
        circle(pxx, pyy, 12)
        break;
      }
    }
  }
}

function padding() {
  const pad = 50;
  fill(255);
  RECT(0, 0, pad, h);
  rect(0, 0, w, pad);
  rect(w-pad, 0, pad, h);
  rect(0, h-pad, w, pad);
}
