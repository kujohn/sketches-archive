const canvasSketch = require('canvas-sketch');
const p5 = require('p5');

let els;

const preload = p5 => {
  els = p5.loadImage('data/01.svg');
};

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5, preload },
  // Turn on a render loop
  animate: true
};

canvasSketch((d) => {
  let x = 0;
  let y = 0;
  let step = 5;
  let mSize = 100;
  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    with (p5) {
      if (x == 0 && y == 0) {
        x = mouseX;
        y = mouseY;
        noFill();
      }
      if (mouseIsPressed && mouseButton === 'left') {
        const d = dist(x, y, mouseX, mouseY);

        if (d > step) {
          const a = atan2(mouseY - x, mouseX - x);

          push()
          translate(mouseX, mouseY)
          rotate(a + PI)
          image(els, 0, 0, 40, 40)
          pop()

          x = x + cos(a) * step;
          y = y + sin(a) * step;
        }
      }
    }
  };
}, settings);
