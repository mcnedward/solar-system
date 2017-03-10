function SolorSystem() {
  var self = this;

  self.width = ko.observable(width);
  self.height = ko.observable(height);

  const sunOptions = {
    level: 1,
    radius: 25,
    color: '#FDB813'
  },
  planetOptions = {
    level: 2,
    minSize: 10,
    maxSize: 15,
    minDistance: 20,
    maxDistance: 100,
    count: randomInt(1, 6)
  },
  moonOptions = {
    level: 3,
    minSize: 2,
    maxSize: 7,
    minDistance: 10,
    maxDistance: 30,
    count: randomInt(0, 3),
    color: '#d3d3d3'
  };

  self.sunOptions = ko.observable(new OrbitalOptions(sunOptions, 'Sun'));
  self.planetOptions = ko.observable(new OrbitalOptions(planetOptions, 'Planet'));
  self.moonOptions = ko.observable(new OrbitalOptions(moonOptions, 'Moon'));

  var sun;
  self.createSolarSystem = function() {
    sun = new Orbital(null, {
      level: self.sunOptions().level(),
      radius: self.sunOptions().radius(),
      color: self.sunOptions().color(),
    });
    sun.setPosition(width / 2, height / 2);
    sun.setName('The Sun');

    var orbitalOptions = [self.sunOptions(), self.planetOptions(), self.moonOptions()];
    sun.createChildren(orbitalOptions);
  }
  self.createSolarSystem();

  // sun = new Orbital(width / 2, height / 2, null, sunOptions);
  // sun.name = 'The Sun';
  // sun.createChildren(sunOptions.childCount, true);

  const starCount = 500,
        starRadius = 0.5,
        starColor = '#ffffff';
  var stars = [];
  for (var i = 0; i < starCount; i++) {
    var x = randomInt(0, self.width());
    var y = randomInt(0, self.height());
    stars.push({x: x, y: y});
  }

  renderer.render(() => {
    renderStars();
    sun.update();
    sun.render();
    renderChildren(sun);
  });

  function renderStars() {
    for (var i = 0, l = stars.length; i < l; i++) {
      var star = stars[i];
      star.x += 1;
      star.y += 0.5;
      renderer.ellipse(star.x, star.y, starRadius, starColor);

      if (star.x > width) {
        star.x = 0;
      }
      if (star.y > height) {
        star.y = 0;
      }
    }
  }

  function renderChildren(orbital) {
    for (var i = 0; i < orbital.children.length; i++) {
      var child = orbital.children[i];
      child.update();
      child.render(orbital);
      renderChildren(child);
    }
  }
}