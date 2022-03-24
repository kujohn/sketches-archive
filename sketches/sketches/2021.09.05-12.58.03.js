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
    p5.fill(100, 100, 130);
    p5.noStroke();
    const cx = width / 2;
    const cy = height / 2;
    for (let i = 0; i < 200; i++) {
      const x = p5.cos((3.14 / 180) * i) * 100;
      const y = p5.sin((3.14 / 180) * i) * 100;
      p5.circle(cx + x, cy + y, 5);
    }
  };
}, settings);
