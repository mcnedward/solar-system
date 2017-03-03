function SolorSystem() {
  var self = this;

  self.width = ko.observable(width);
  self.height = ko.observable(height);

  var sunRadius = 50,
      planetMin = 15,
      planetMax = 25;
  var sun = new Orbital(width / 2, height / 2, sunRadius);
  sun.color = '#FDB813';

  var previousDistance = 0;
  for (var i = 0; i < 3; i++) {
    var max = planetMax * (0.3 * i);
    if (planetMax < planetMin) planetMax = planetMin + 1;
    var radius = randomInt(planetMin, planetMax);
    var distance = randomInt(50, 150) + previousDistance;
    previousDistance = distance;
    var child = new Orbital(0, 0, radius, sun, distance);
    sun.addChild(child);
    previous = child;
  }

  renderer.render(() => {
    sun.update();
    sun.render();
    renderChildren(sun);
  });

  function renderChildren(orbital) {
    for (var i = 0; i < orbital.children.length; i++) {
      var child = orbital.children[i];
      child.update();
      child.render();
      renderChildren(child);
    }
  }
}