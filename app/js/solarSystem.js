function SolarSystem() {
  var self = this;

  self.width = ko.observable(width);
  self.height = ko.observable(height);

  self.sunOptions = ko.observable(new OrbitalOptions('sun'));
  self.planetOptions = ko.observable(new OrbitalOptions('planet'));
  self.moonOptions = ko.observable(new OrbitalOptions('moon'));

  var sun;
  self.generateSolarSystem = function() {
    sun = new Orbital(null, {
      level: self.sunOptions().level(),
      radius: self.sunOptions().radius(),
      color: self.sunOptions().color(),
    });
    sun.setPosition(width / 2, height / 2);
    sun.setName('The Sun');

    var orbitalOptions = [self.sunOptions(), self.planetOptions(), self.moonOptions()];
    sun.createChildren(orbitalOptions);

    // Save the current options
    self.sunOptions().save();
    self.planetOptions().save();
    self.moonOptions().save();
  }
  self.generateSolarSystem();

  self.resetToDefault = () => {
    self.sunOptions().save(true);
    self.planetOptions().save(true);
    self.moonOptions().save(true);
    
    self.generateSolarSystem();
  }

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