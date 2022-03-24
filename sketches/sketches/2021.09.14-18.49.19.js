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

const sketch = ({ gl }) => {
  // Setup REGL with our canvas context
  const regl = createRegl({ gl });

  // Regl GL draw commands
  // ..
  //
  const f = `
precision mediump float;
uniform vec4 color;

void main() {
gl_FragColor = color;

}
`;
  const v = `
precision mediump float;
attribute vec2 position;
void main () {
gl_Position = vec4(position, 0, 1);
}
`;

  const triangleDraw = regl({
    frag: f,
    vert: v,
    attributes: {
      position: [
        [-0.5, 0],
        [0, -0.5],
        [0.5, 0.5]
      ]
    },
    uniforms: {
      color: [1, 0, 0, 1]
    },
    count: 3
  });

  // Return the renderer function
  return ({ time }) => {
    // Update regl sizes
    regl.poll();

    triangleDraw();

    // Draw meshes to scene
    // ...
  };
};

canvasSketch(sketch, settings);
