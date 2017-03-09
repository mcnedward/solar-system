function Orbital(x, y, radius, parentOrbital, distance, level) {
  var self = this;

  self.x = x;
  self.y = y;
  self.radius = radius;
  self.distance = distance;
  self.parentOrbital = parentOrbital;
  self.children = [];
  self.color = randomColor();

  self.level = level;

  var speed = random(0.02, 0.08),
      angle = random(0, Math.PI);

  const childMin = 15,
      childMax = 25;

  self.createChildren = function(count, hasMoreChildren) {
    var previousDistance = 0;
    for (var i = 0; i < count; i++) {
      var max = childMax * (0.3 * i);
      if (childMax < childMin) childMax = childMin + 1;
      
      var radius = randomInt(childMin, childMax);
      var distance = randomInt(50, 150) + previousDistance;
      previousDistance = distance;

      var child = new Orbital(0, 0, radius, self, distance, self.level + 1);
      self.children.push(child);
      previous = child;

      if (hasMoreChildren) {
        var newChildCount = randomInt(0, 3);
        child.createChildren(newChildCount, false);
      }
    }
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

  self.render = (parent) => {
    var x, y;
    if (parent) {
      var r = self.radius + self.distance + (parent.radius * 0.5);
      self.x = parent.x + r * Math.cos(angle);
      self.y = parent.y + r * Math.sin(angle);
    }

    renderer.ellipse(self.x, self.y, self.radius, self.color);
  }
}