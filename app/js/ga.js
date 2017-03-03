function GA(options) {
  var self = this;

  self.width = ko.observable(width);
  self.height = ko.observable(height);

  var genome = [];
  var target = new Entity(width - 20, height - 20, null, 'green');

  for (var i = 0; i < 10; i++) {
    genome.push(new Entity(50, 50, target));
  }

  renderer.render(() => {
    var deadEntities = 0;
    for (var i = 0; i < genome.length; i++) {
      var entity = genome[i];
      if (!entity.isDead) {
        entity.update();
      } else {
        deadEntities++;
      }
      entity.render();
    }
    target.render();
    
    if (deadEntities === genome.length) {
      startNewGeneration();
    }
  })

  function startNewGeneration() {
    var parent1 = findBest();
    var parent2 = findBest();
  }

  function findBest() {
    var fit = genome[0].fitness, index = 0;
    for (var i = 0; i < genome.length; i++) {
      var entity = genome[i];
      if (entity.fitness < fit) {
        fit = entity.fitness;
        index = i;
      }
    }
    return genome.splice(index, 1);
  }
}