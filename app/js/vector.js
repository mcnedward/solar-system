function Vector(x, y) {
  this.x = x;
  this.y = y;

  this.add = (vector) => {
    this.x += vector.x;
    this.y += vector.y;
  }

  this.mult = (val) => {
    this.x *= val;
    this.y *= val;
  }
}