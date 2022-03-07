const canvasSketch = require('canvas-sketch');
const p5 = require('p5');

const preload = p5 => {
  // You can use p5.loadImage() here, etc...
};

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5, preload },
  // Turn on a render loop
  animate: true
};

canvasSketch(() =>  {
  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    p5.background(0);
    p5.fill(255);
    p5.noStroke();

    const anim = p5.sin(time - p5.PI / 2) * 0.5 + 0.5;
    p5.circle(width/2, height/2, p5.cos(time) * 300.);
    p5.circle(30, 30, p5.sin(time) * 200.);
    p5.circle(width-30, height-30, p5.sin(time/.5) * 200.);
    p5.circle(width, 30, p5.sin(time/2.5) * 200.);
    p5.circle(30, height, p5.sin(time/.9) * 200.);
  };
}, settings);
