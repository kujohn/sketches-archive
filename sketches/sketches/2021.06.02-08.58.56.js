const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
const lib = require('../library/');
const colors = ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'];

const preload = (p5) => {
  lib.init(p5, colors);
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
    const cx = width / 2;
    const cy = height / 2;
    const center = p5.createVector(cx, cy);

    lib.sphere(center, 100, 100, 0, p5.color('#aaa'));
    return;
    for (let i = 0; i < 50; i++) {
      const x = p5.random(0, width);
      const y = p5.random(0, height);
      const point = p5.createVector(x, y);
      const c = p5.random(colors);

      const size = p5.random(50, 100);
      const d = p5.random(size * 0.5, size * 2);
      const r = p5.random(0, 360);

      p5.strokeWeight(1);
      lib.sphere(point, size, d, r, c);
    }
  };
}, settings);
