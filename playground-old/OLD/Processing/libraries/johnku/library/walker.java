package walker
PVector randSpeed () {
  return new PVector(random(-3, 3), random(-3, 3));
}

class Walker {
  PVector location;
  PVector speed;
  PVector direction;
  int lifetime;
  color c1;

  Walker (PVector loc) {
    location = loc;
    speed = randSpeed();
    direction = new PVector(random(2), random(2));
    lifetime = (int) random(defaultLifetime);
    c1 = c;
  }

  void update () {
    if (lifetime == 0) return;

    fill(c1, map(lifetime, 0, 1000, 0, 255));
    circle(location.x, location.y, 1);

    if (direction.x == 1) {
      location.add(speed.x, 0);
    }

    if (direction.x == 0) {
      location.sub(speed.x, 0);
    }

    if (direction.y == 1) {
      location.add(0, speed.y);
    }

    if (direction.y == 0) {
      location.sub(0, speed.y);
    }

    direction.x = location.x < width ? 1 : 0;
    direction.y = location.y < height ? 1 : 0;
    lifetime -= 1;
  }

  boolean dead() {
    return lifetime == 0;
  }
}
