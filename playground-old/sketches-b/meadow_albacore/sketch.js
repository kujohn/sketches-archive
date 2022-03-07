var w = 800;
var h = 800;
function setup() {
  createCanvas(w, h);
  noStroke();
  frameRate(50);
  fill(255, 255, 255, 45);
}

function draw() {
  var size = frameCount * 20;
  var xs = size % w;
  var ys = size % h;

  for (var i = 0; i < 360; i++) {
    var x = sin(radians(i)) * xs + (w/2);
    var y = cos(radians(i)) * ys + (h/2);
    circle(x, y, (i % 20));
  }
}
