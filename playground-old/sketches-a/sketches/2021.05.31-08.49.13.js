const canvasSketch = require('canvas-sketch');
const p5 = require('p5');

const preload = (p5) => {
  // You can use p5.loadImage() here, etc...
};

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5, preload },
  // Turn on a render loop
  animate: true
};

canvasSketch(() => {
  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    p5.background(255);
    p5.fill(0);
    p5.stroke(0);
    p5.noiseSeed(100);
    p5.randomSeed(101);

    const cx = width / 2;
    const cy = height / 2;

    const grid = 20;
    const gx = p5.ceil(width / grid);
    const gy = p5.ceil(height / grid);

    for (let x = 0; x < gx; x++) {
      for (let y = 0; y < gy; y++) {
        const r = p5.ceil(p5.random(0, 3));
        let ax = x * grid;
        let ay = y * grid;
        let bx = ax + grid;
        let by = ay + grid;
        switch (r) {
          case 0:
            bx += grid;
            by += grid;
            break;
          case 1:
            ax += grid;
            bx -= grid;
            break;
          case 2:
            ax += grid / 2;
            bx -= grid / 2;
            break;
          default:
          case 3:
            ay += grid / 2;
            by -= grid / 2;
            break;
        }

        p5.line(ax, ay, bx, by);
      }
    }
  };
}, settings);
