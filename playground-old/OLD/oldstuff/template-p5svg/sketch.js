/************ customizable *************/
const w = 900;
const h = 700;
const center = new p5.Vector(w/2, h/2)

const fps = 70;
const filename = `test`;

let captureAutoStart = false;
let captureAutoFrom = 0;
let captureDuration = 1;


/***************************************/
/************ START DRAWING ************/
/***************************************/

function init() {
}

function drawer(ctx) {
  ctx.ellipse(mouseX, mouseY, random(10, 30))
}

/***************************************/
/************** END DRAWING ************/
/***************************************/

let domFrames
let domCapture
let domCaptureFrames

let capturing = false;
let captureStart = 0;
let captureEnd = 0;
let ctxSVG = null;
let ctx = null;

function setup() {
  ctx = createGraphics(w, h);
  ctxSVG = createGraphics(w, h, SVG);

  pixelDensity(2);
  ctx.pixelDensity(2)
  ctxSVG.pixelDensity(1)

  frameRate(fps)
  ctx.frameRate(fps)
  ctxSVG.frameRate(fps)

  domFrames = select("#frames")
  domCaptureFrames = select("#duration")
  domCaptureFrames.elt.value = captureDuration
  domCapture = select("#capture")
  domCapture.elt.addEventListener('click', () => {
    captureDuration = parseInt(domCaptureFrames.elt.value);
    const autoStartAdd = captureAutoStart ? captureAutoFrom : 0;
    captureStart = autoStartAdd + frameCount + 1;
    captureEnd = autoStartAdd + frameCount + 1 + captureDuration;
  });
  init();
}

function draw() {
  // start capture automatically
  if (captureAutoStart) {
    domCapture.elt.click();
    captureAutoStart = false;
  }

  // update capturing
  capturing = frameCount >= captureStart && frameCount < captureEnd;
  if (capturing) {
    domCapture.elt.innerHTML = captureEnd - frameCount;
  }

  // update frame count in dom
  domFrames.elt.innerHTML = frameCount

  // actual drawing
  drawer(ctx);
  drawer(ctxSVG);

  // save
  if (frameCount === captureEnd) {
    ctxSVG.save(filename);
    domCapture.elt.innerHTML = "capture"
  }
}
