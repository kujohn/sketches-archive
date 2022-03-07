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

canvasSketch(({ p5 }) => {
  let step = 4;
  let x = 0;
  let y = 0;

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    with (p5) {
      if (mouseIsPressed && mouseButton == "left") {
        const d = dist(x, y, mouseX, mouseY)
        if (d > step)  {
          console.log('aaa')
          push();
          const angle = atan2(mouseY - y, mouseX - x)
          translate(x, y)
          rotate(angle)
          const l = 30 * random(0.95, 1.0) * d/10;
          line(0, 0, 0, l);
          pop();
          x = x + cos(angle) * step;
          y = y + sin(angle) * step;
        }
      }
    }
  };
}, settings);
