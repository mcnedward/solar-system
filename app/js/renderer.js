function Renderer() {
  var self = this;
  self.render = ko.observable();
  self.backgroundColor = 'black';

  const canvas = $('#theCanvas')[0],
        context = canvas.getContext('2d');

  function render() {
    try {
      requestAnimationFrame(render);
      // Clear the canvas each frame
      clear();

      // Do the rendering
      if (self.render())
        self.render()();
      
    } catch(e) {
      // Swallowing exeptions till I figure a better way to report them
      console.error(e)
    }
  }
  render();

  self.ellipse = (x, y, radius, color) => {
    context.beginPath();
    // Ellipse: void context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
    context.ellipse(x, y, radius, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
  };

  self.polygon = (points, color, alpha) => {
    var polygonPoints = points.slice(0);  // Need a copy of the points here
    context.beginPath();
    context.fillStyle = color;

    var firstPoint = polygonPoints[0];
    var separatePoints = [];
    for (var i = 0; i < polygonPoints.length; i++) {
      var point = polygonPoints[i];
      if (i === 0) {
        context.moveTo(point.x, point.y);
      } else {
        if (point.x === firstPoint.x && point.y === firstPoint.y && i < polygonPoints.length - 1) {
          // Need to create a separate polygon for these points
          separatePoints = polygonPoints.splice(i + 1, polygonPoints.length - i);
        }
        context.lineTo(point.x, point.y);
      }
    }

    context.fill();
    context.closePath();

    if (separatePoints.length > 0)
      self.polygon(separatePoints, color);
  };

  function clear() {
    context.fillStyle = self.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}