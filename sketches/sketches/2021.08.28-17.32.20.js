const canvasSketch = require("canvas-sketch");
const createRegl = require("regl");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  // Turn on MSAA
  attributes: { antialias: true },
};

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));

let all = [];
for (let i = 0; i < 1000; i++) {
  all.push({
    speed: lerp(-0.07, 0.07, Math.random()),
    scale: lerp(0.001, 0.015, Math.random()),
    x: lerp(-1, 1, Math.random()),
    y: lerp(-1, 1, Math.random()),
    color: [Math.random(), Math.random(), Math.random()],
  });
}

const sketch = ({ gl }) => {
  // Setup REGL with our canvas context
  const regl = createRegl({ gl });

  var spinningTriangle = regl({
    frag: `
  precision mediump float;
  uniform vec3 color;
  void main() {
    gl_FragColor = vec4(color, 1);
  }`,

    vert: `
  attribute vec3 color;
  attribute vec2 position;
  uniform float posX, posY, angle, scale, width, height;
  void main() {
    float aspect = width / height;
    float x = position.x;
    float y = position.y;
    gl_Position = vec4(
      scale * (sin(angle) * x - cos(angle) * y) + posX,
      aspect * scale * (cos(angle) * x + sin(angle) * y) + posY,
      0,
      1.0);
  }`,

    attributes: {
      position: [
        [0, -1],
        [-1, 0],
        [1, 1],
      ],
    },

    uniforms: {
      angle: (ctx, props, id) => props.speed * ctx.tick,
      color: regl.prop("color"),
      posX: regl.prop("x"),
      posY: regl.prop("y"),
      scale: regl.prop("scale"),
      width: regl.context("viewportWidth"),
      height: regl.context("viewportHeight"),
    },
    count: 3,
  });

  return ({ time }) => {
    regl.poll();
    regl.clear({
      color: [0, 0.2, 0.2, 1],
    });

    spinningTriangle(all);
  };
};

canvasSketch(sketch, settings);
