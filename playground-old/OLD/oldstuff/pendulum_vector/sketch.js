const w = 300;
const h = 600

function doubleClicked() {
  save("xyz.svg")
}

let shape
let joints = 10;
let length = 50;
let speedr = 2;

function setup() {
  pixelDensity(2)
  createCanvas(w, h);
  background(255);
  noFill();

  shape = new Shape(createVector(w/2, h/2), joints, length, speedr)
}

class Shape {
  constructor (center, joints, length, speedr)  {
    this.center = center
    this.joints = joints
    this.speedr = speedr
    this.length = length

    this.paths = [];
    this.angle = 0;
    this.maxAngle = 360;

    // black magic
    this.speed = (8 / pow(1.75, this.joints -1) / pow(2, speedr - 1));

    for (let i = 0; i < joints; i++) {
      this.paths.push([])
    }
  }

  update() {
    this.angle += this.speed

    if (this.angle <= this.maxAngle + this.speed) {
      let pos = this.center.copy()

      for (let i = 0; i < this.joints; i++) {
        let a = this.angle * pow(speedr, i)
        if (i % 2 == 1) {
          a = -a;
        }

        let next = p5.Vector.fromAngle(radians(a))
        next.setMag((this.length / this.joints) * (this.joints - i))
        // add center
        next.add(pos)


        // noStroke();
        // fill(0, 10);
        // ellipse(pos.x, pos.y, 4, 4);
        // noFill();
        // stroke(0, 10);
        line(pos.x, pos.y, next.x, next.y); //     
        pos = next
        this.paths[i].push(pos)
      }
    }
  }

  draw() {
    this.update();
    for (let i = 0; i < this.paths.length; i++) {
      let paths = this.paths[i]
      beginShape()
      for (var j = 0; j < paths.length; j++) {
        vertex(paths[j].x, paths[j].y)
      }
      endShape()
    }
  }
}


function draw() {
  shape.draw()
}
