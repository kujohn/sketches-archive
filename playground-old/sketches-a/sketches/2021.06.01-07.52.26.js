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
  let points = [];
  const colors = ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'];
  return ({ p5, time, width, height }) => {
    p5.background(255);
    p5.randomSeed(200);

    const cx = width / 2;
    const cy = height / 2;

    if (points.length == 0) {
      for (let i = 0; i < 100; i++) {
        points.push(p5.createVector(p5.random(width), p5.random(height)));
      }
    }

    p5.strokeWeight(1);
    p5.stroke(255);
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const size = p5.random(30, 70);
      const s = p5.abs(p5.cos(time * p5.noise(i)) * size);
      const h = s / 2;
      const c = p5.random(colors);
      p5.fill(c);
      p5.rect(p.x - h, p.y - h, s);
    }
  };
}, settings);
