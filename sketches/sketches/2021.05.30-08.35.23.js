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

let dx = 0;
let dy = 0;

canvasSketch(() => {
  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    class Dot {
      constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
      }

      get coord() {
        return this;
      }

      drawTo(dx, dy) {
        const { x, y } = this;
        p5.line(x, y, dx, dy);
      }

      draw() {
        const { x, y, size } = this;
        p5.circle(x, y, size);
      }
    }

    // Draw with p5.js things
    p5.background(255);
    p5.fill(p5.color(255, 255, 255, 1));
    p5.stroke(0);
    const cx = width / 2;
    const cy = height / 2;
    const innerSize = width / 2;

    dx = cx + p5.tan(200) * 100;
    dy = cy + p5.cos(100) * 100;
    let pa = [];

    for (let i = 0; i < 120; i++) {
      const x = p5.cos(p5.radians(i)) * innerSize;
      const y = p5.sin(p5.radians(i)) * innerSize;

      pa.push(new Dot(cx + x, cy + y, 3));
    }

    for (let i = 0; i < pa.length; i++) {
      const d = pa[i];
      d.draw();
      d.drawTo(dx, dy);
    }
  };
}, settings);
