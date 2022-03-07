const canvasSketch = require('canvas-sketch');
const createRegl = require('regl');

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const frag = `
precision mediump float;

uniform float width, height, u_time;

void main() {
    vec2 st = gl_FragCoord.xy / vec2(width, height);

    // center position
    vec2 pos = vec2(0.5)-st;
    float r = length(pos)*1.;
    float a = atan(pos.x, pos.y);
    float f = abs(cos(a*u_time)*sin(a*40.0));

    vec3 color = vec3(smoothstep(f, f+.5,r));
    gl_FragColor = vec4(color, 1.);
}
`;

const vert = `
precision mediump float;
attribute vec3 color;
attribute vec2 position;
uniform float u_time, angle, scale, width, height;
void main() {
  float aspect = width / height;
  float x = position.x;
  float y = position.y;
  gl_Position = vec4(
    scale * (sin(angle) * x - cos(angle) * y),
    aspect * scale * (cos(angle) * x + sin(angle) * y),
    0,
    1.0);
}
`;

let mX = 0;
let mY = 0;
document.addEventListener('mousemove', (e) => {
  mX = e.clientX;
  mY = e.clientY;
});

const dist = (x1, y1, x2, y2) => {
  let a = x2 - x1;
  let b = y2 - y1;

  a = a * a;
  b = b * b;

  return Math.sqrt(a + b);
};

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

const sketch = ({ gl }) => {
  const regl = createRegl({ gl });
  const width = gl.drawingBufferWidth;
  const height = gl.drawingBufferHeight;
  const cX = width / 2;
  const cY = height / 2;
  const tiling = regl({
    vert,
    frag,
    attributes: {
      position: [
        [0, -1],
        [-1, 0],
        [1, 1]
      ]
    },
    uniforms: {
      u_time: regl.context('time'),
      scale: () => clamp(invlerp(0, width, mX), 0.2, 1),
      angle: (ctx, props, id) => {
        const o = id % 2 === 0;
        const a = props.speed * (ctx.tick * 0.01) * id;
        return o ? a * -1 : a;
      },
      width: regl.context('viewportWidth'),
      height: regl.context('viewportHeight')
    },
    count: 3
  });

  // Return the renderer function
  return ({ time }) => {
    // Update regl sizes
    regl.poll();
    tiling([
      { speed: 0.1 },
      { speed: 0.2 },
      { speed: 0.3 },
      { speed: 0.4 },
      { speed: 0.1 },
      { speed: 0.2 },
      { speed: 0.3 },
      { speed: 0.4 }
    ]);
  };
};

canvasSketch(sketch, settings);
