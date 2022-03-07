const tiles = 20;
const w = 600;
const h = 600

function setup() {
  pixelDensity(1)
  createCanvas(w, h, SVG);
  background(255);
  noLoop()
}

function padding() {
  const pad = 50;
  fill(255);
  noStroke();
  rect(0, 0, pad, h);
  rect(0, 0, w, pad);
  rect(w-pad, 0, pad, h);
  rect(0, h-pad, w, pad);
}

function draw() {
  for (let gy = 0; gy < tiles; gy++) {
    for (let gx = 0; gx < tiles; gx++) {
      const toggle = Math.floor(random(2))
      const px = w/tiles*gx
      const py = h/tiles*gy
      const pxx = px-w/tiles;
      const pyy = py-h/tiles;
      switch (toggle) {
      case 0:
        line(px, py, pxx,pxx);
        break;
      case 1:
        line(px, py, pxx, pxx);
        break;
      }
    }
  }
  // padding()
  save("xyz.svg")
}
