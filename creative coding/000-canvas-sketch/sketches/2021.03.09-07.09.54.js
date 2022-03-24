const canvasSketch = require('canvas-sketch');
const p5 = require('p5');


let font;
let shapeSpace;
let shapeSpace2;
let shapePeriod;
let shapeComma;
let shapeQuestionmark;
let shapeExclamationmark;
let shapeReturn;
let icon1;
let icon2;
let icon3;
let icon4;
let icon5;

const preload = p5 => {
  // You can use p5.loadImage() here, etc...
  font = p5.loadFont('data/miso-bold.ttf')
  shapeSpace = p5.loadImage('data/space.svg');
  shapeSpace2 = p5.loadImage('data/space2.svg');
  shapePeriod = p5.loadImage('data/period.svg');
  shapeComma = p5.loadImage('data/comma.svg');
  shapeExclamationmark = p5.loadImage('data/exclamationmark.svg');
  shapeQuestionmark = p5.loadImage('data/questionmark.svg');
  shapeReturn = p5.loadImage('data/return.svg');

  icon1 = p5.loadImage('data/icon1.svg');
  icon2 = p5.loadImage('data/icon2.svg');
  icon3 = p5.loadImage('data/icon3.svg');
  icon4 = p5.loadImage('data/icon4.svg');
  icon5 = p5.loadImage('data/icon5.svg');
};

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5, preload },
  // Turn on a render loop
  animate: false
};

canvasSketch(({p5}) => {
  const text = `Return a renderer, which is like p5.js 'draw' function`
  return ({ p5, time, width, height }) => {
    with (p5) {
      textFont(font);
      textAlign(LEFT, BASELINE);
    }
  };
}, settings);
