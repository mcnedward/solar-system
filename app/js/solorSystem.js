function SolorSystem() {
  var self = this;

  self.width = ko.observable(width);
  self.height = ko.observable(height);

  var sunRadius = 50,
      planetMin = 15,
      planetMax = 25;

  var sun = new Orbital(width / 2, height / 2, sunRadius, null, null, 1);
  sun.color = '#FDB813';
  sun.name = 'The Sun';
  sun.createChildren(3, true);

  renderer.render(() => {
    sun.update();
    sun.render();
    renderChildren(sun);
  });

  function renderChildren(orbital) {
    for (var i = 0; i < orbital.children.length; i++) {
      var child = orbital.children[i];
      child.update();
      child.render(orbital);
      renderChildren(child);
    }
  }
}