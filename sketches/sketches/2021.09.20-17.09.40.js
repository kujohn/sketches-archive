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

  var drawTest = regl({
    frag: `
  void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
  }`,

    vert: `
  attribute vec2 position;
  uniform float angle, scale, width, height;
  void main() {
    float aspect = width / height;
    gl_Position = vec4(
      scale * (cos(angle) * position.x - sin(angle) * position.y),
      aspect * scale * (sin(angle) * position.x + cos(angle) * position.y),
      0,
      1.0);
  }`,

    attributes: {
      position: [
        [0, -1],
        [-1, 0],
        [1, 1]
      ]
    },

    uniforms: {
      //
      // Dynamic properties can be functions.  Each function gets passed:
      //
      //  * context: which contains data about the current regl environment
      //  * props: which are user specified arguments
      //  * batchId: which is the index of the draw command in the batch
      //
      angle: function (context, props, batchId) {
        return props.speed * context.tick + 0.01 * batchId;
      },

      // As a shortcut/optimization we can also just read out a property
      // from the props.  For example, this
      //
      scale: regl.prop('scale'),
      //
      // is semantically equivalent to
      //
      //  scale: function (context, props) {
      //    return props.scale
      //  }
      //

      // Similarly there are shortcuts for accessing context variables
      width: regl.context('viewportWidth'),
      height: regl.context('viewportHeight')
      //
      // which is the same as writing:
      //
      // width: function (context) {
      //    return context.viewportWidth
      // }
      //
    },

    count: 3
  });

  // Regl GL draw commands
  // ...

  // Return the renderer function
  return ({ time }) => {
    // Update regl sizes
    regl.poll();
    drawTest([
      { scale: 0.3, speed: 0.005 },
      { scale: 0.2, speed: -0.005 }
    ]);

    // Draw meshes to scene
    // ...
  };
};

canvasSketch(sketch, settings);
