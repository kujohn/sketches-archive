let p5;
let colors;

const toHSB = (c) => {
  const hue = p5.hue(c);
  const sat = p5.saturation(c);
  const bri = p5.brightness(c);
  return [hue, sat, bri];
};

class Color {
  constructor(c) {
    this.colorText = c;
    this.color = p5.color(c);
  }

  toHSB() {
    toHSB(this.color);
  }
}

class Item {
  position;
  size;
  color;
  constructor(pos, size, color) {
    this.position = pos;
    this.size = size;
    this.color = color;
  }

  rotate(degree) {
    const {
      position: { x, y }
    } = this;
    p5.translate(x, y);
    p5.rotate(degree);
  }

  get color() {
    return this.color;
  }
}

class Sphere extends Item {
  constructor(p, s, c) {
    super(p, s, c);
  }

  draw(degree = 0) {
    p5.text('fkewk', 50, 50);
    const {
      pos: { x, y },
      color,
      size
    } = this;
    p5.push();
    this.rotate(degree);
    const [hue, sat, bri] = color.toHSB();

    p5.colorMode(p5.HSB, 255);
    const cc = p5.color(hue, sat - 25, bri + 15);

    p5.fill(cc);
    p5.arc(0, 0, size, size, 0, p5.PI);
    p5.fill(color.color);
    p5.ellipse(0, 0, size, h);
    p5.pop();
  }
}

// const sphere = ({ x, y }, size, deform, r = 0, color = '#888') => {
//   const h = size / 2;
//   p5.push();
//   p5.translate(x, y);
//   p5.rotate(r);
//   const c = color;
//   const [hue, sat, bri] = toHSB(p5.color(c));

//   p5.colorMode(p5.HSB, 255);
//   const cc = p5.color(hue, sat - 25, bri + 15);

//   p5.fill(cc);
//   p5.arc(0, 0, size, deform, 0, p5.PI);
//   p5.fill(c);
//   p5.ellipse(0, 0, size, h);
//   push.pop();
// };

const init = (p) => {
  p5 = p;
};

export { init, Sphere, Color, toHSB };
