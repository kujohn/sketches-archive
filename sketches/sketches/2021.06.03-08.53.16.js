const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
const lib = require('../library/');

const preload = (p5) => {
  lib.init(p5);
};

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5, preload },
  // Turn on a render loop
  animate: true
};

canvasSketch(() => {
  const { Sphere } = lib;
  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    p5.background(100);

    const c = p5.createVector(width / 2, height / 2);

    p5.stroke(255);
    p5.line(0, 0, width, height);
    p5.line(0, 0, width, height);
    // const s = new Sphere(c, 50, '#eee');
    // s.draw();
    p5.text('kkkkkkkkkk', c.x, c.y);
  };
}, settings);
