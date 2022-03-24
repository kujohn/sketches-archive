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

const sketch = ({ gl }) => {
  // Setup REGL with our canvas context
  const regl = createRegl({ gl });

  // Regl GL draw commands
  const drawTriangle = regl({
    // In a draw call, we can pass the shader source code to regl
    frag: `
    precision mediump float;
    uniform vec4 color;
    void main () {
      gl_FragColor = vec4(.6, .9, .4, 1);
    }
    `,

    vert: `
    precision mediump float;
    attribute vec2 position;
    void main () {
      gl_Position = vec4(position, 0, 1);
    }`,

    attributes: {
      position: [
        [-0.5, 0],
        [0, -0.5],
        [0.5, 0.5],
      ],
    },

    uniforms: {
      color: [0, 0, 0, 1],
    },

    count: 3,
  });

  // Return the renderer function
  return ({ time }) => {
    // Update regl sizes
    regl.poll();
    // Clear back buffer
    regl.clear({
      color: [0, 0, 0, 1],
    });

    // Draw meshes to scene
    drawTriangle();
  };
};

canvasSketch(sketch, settings);
