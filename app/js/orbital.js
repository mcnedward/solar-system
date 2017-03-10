function Orbital(x, y, parent, options) {
  var self = this;

  self.x = x;
  self.y = y;
  self.radius = options.radius;
  self.parentOrbital = parent;
  self.distance = options.distance;
  self.level = options.level;
  self.color = options.color ? options.color : randomColor();
  self.children = [];

  var speed = random(0.02, 0.04),
      angle = random(0, Math.PI);

  const childMinSize = options.childMinSize,
        childMaxSize = options.childMaxSize,
        childMinDistance = options.childMinDistance,
        childMaxDistance = options.childMaxDistance;

  self.createChildren = function(count, hasMoreChildren) {
    var previousDistance = 0;
    for (var i = 0; i < count; i++) {
      var max = childMaxSize * (0.3 * i);
      if (childMaxSize < childMinSize) childMaxSize = childMinSize + 1;
      
      var radius = randomInt(childMinSize, childMaxSize);
      var distance = randomInt(childMinDistance, childMaxDistance) + previousDistance;
      previousDistance = distance;

      var options;
      if (self.level === 1) {
        options = planetOptions;
      } else {
        options = moonOptions;
      }
      options.radius = radius;
      options.distance = distance;

      var child = new Orbital(0, 0, self, options);
      self.children.push(child);
      previous = child;

      if (hasMoreChildren) {
        child.createChildren(options.childCount, false);
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