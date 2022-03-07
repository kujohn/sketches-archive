const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    console.log(context);
    context.fillStyle = "yellow";
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
