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
  let src;
  const colors = ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'];
  return ({ p5, time, width, height }) => {
    p5.background(255);

    const cx = width / 2;
    const cy = height / 2;

    if (points.length == 0) {
      for (let i = 0; i < 2000; i++) {
        points.push(p5.createVector(p5.random(width), p5.random(height)));
      }
    }

    if (!src) {
      src = p5.createVector(width, height);
    }

    for (let i = 0; i < points.length; i++) {
      p5.randomSeed(i);
      const p = points[i];
      const size = p5.random(5, 20);
      const s = p5.abs(p5.cos(time + i) * size);
      const h = s / 2;
      const c = p5.random(colors);
      const color = p5.color(c);

      const xx = p.x - h;
      const yy = p.y - h;

      const d = p5.dist(xx, yy, src.x, src.y);
      const show = d < p5.random(0, 500);

      if (!show) {
        color.setAlpha(50);
      }
      p5.fill(color);
      p5.strokeWeight(0);
      p5.circle(xx, yy, s);

      if (show) {
        p5.strokeWeight(1);
        color.setAlpha(255);
        p5.stroke(color);
        p5.line(xx, yy, src.x, src.y);
      }
    }

    p5.strokeWeight(0);
    p5.fill('#fff');
    const r = 300;
    const speed = 100;
    const x = p5.tan(p5.radians(time * speed)) * r;
    const y = p5.sin(p5.radians(time * speed)) * r;
    src = p5.createVector(cx + x, cy + y);
    p5.circle(src.x, src.y, 2);
  };
}, settings);
