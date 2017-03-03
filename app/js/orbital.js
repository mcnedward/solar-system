function Orbital(x, y, radius, parent, distance, isMoon) {
  var self = this;

  self.x = x;
  self.y = y;
  self.radius = radius;
  self.distance = distance;
  self.parent = parent;
  self.children = [];
  self.color = randomColor();
  var speed = random(0.02, 0.08),
      angle = random(0, Math.PI);

  // if (!isMoon) createChildren(childCount);

  // var childMin = 15,
  //     childMax = 25;
  // function createChildren(count) {
  //   var previousDistance = 0;
  //   for (var i = 0; i < count; i++) {
  //     var max = childMax * (0.3 * i);
  //     if (childMax < childMin) childMax = childMin + 1;
      
  //     var radius = randomInt(childMin, childMax);
  //     var distance = randomInt(50, 150) + previousDistance;
  //     previousDistance = distance;

  //     var newChildCount = randomInt(0, 3);
  //     var child = new Orbital(0, 0, radius, newChildCount, self, distance, true);
  //     self.children.push(child);
  //     previous = child;
  //   }
  // }

  self.addChild = (child) => {
    self.children.push(child)
  }

  function randomColor(alpha) {
    var r = parseInt(randomInt(0, 99), 16);
    var g = parseInt(randomInt(0, 99), 16);
    var b = parseInt(randomInt(0, 99), 16);
    var a = alpha ? parseInt(alpha, 16) / 255 : 100;
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
  }

  self.update = () => {
    angle += speed;
  }

  self.render = () => {
    var x, y;
    if (parent) {
      var r = self.radius + self.distance + (parent.radius * 0.5);
      x = parent.x + r * Math.cos(angle);
      y = parent.y + r * Math.sin(angle);
    } else {
      x = self.x;
      y = self.y;
    }

    renderer.ellipse(x, y, self.radius, self.color);
  }
}