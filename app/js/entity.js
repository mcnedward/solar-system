function Entity(x, y, target, color) {
  var self = this;

  self.pos = new Vector(x, y);
  self.velocity = new Vector(1, 0);
  self.acceleration = new Vector(2, 2);
  self.width = 10;
  const red = '#a01111';
  self.color = color ? color : red;

  self.paths = [];
  self.isDead = false;
  self.fitness = 0; // How close is this entity to the target?
  self.target = target;

  function findDistance() {
    var a = Math.pow((self.target.pos.x - self.pos.x), 2);
    var b = Math.pow((self.target.pos.y - self.pos.y), 2);
    return Math.sqrt(a + b);
  }

  function die() {
    self.isDead = true;
    // Find how close it is to target
    var distance = findDistance();
    self.fitness = distance;
  }

  function random() {
    var num = Math.floor(Math.random() * 10) + 1;
    return num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
  }

  self.update = () => {
    var velocity = new Vector(random(), random())
    self.pos.add(velocity);
    self.velocity.add(self.acceleration);
    // self.acceleration.mult(0);

    self.paths.push(velocity);

    var r = self.width / 2;
    // Stay in bounds
    if (self.pos.x > width - r) {
      self.pos.x = width - r;
      die();
    }
    if (self.pos.x <= 0 + r) {
      self.pos.x = r;
      die();
    }
    if (self.pos.y >= height - r) {
      self.pos.y = height - r;
      die();
    }
    if (self.pos.y <= 0 + r) {
      self.pos.y = r;
      die();
    }
  }

  self.render = () => {
    renderer.ellipse(self.pos.x, self.pos.y, self.width, self.color);
  }
}