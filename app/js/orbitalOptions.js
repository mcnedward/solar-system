function OrbitalOptions(options, type) {
  var self = this;

  self.type = type;

  self.level = ko.observable(options.level);
  self.radius = ko.observable(options && options.radius ? options.radius : 0);
  self.minSize = ko.observable(options && options.minSize ? options.minSize : 10);
  self.maxSize = ko.observable(options && options.maxSize ? options.maxSize : 10);
  self.minDistance = ko.observable(options && options.minDistance ? options.minDistance : 10);
  self.maxDistance = ko.observable(options && options.maxDistance ? options.maxDistance : 10);
  self.count = ko.observable(options && options.count ? options.count : randomInt(1, 3));

  var _color = options && options.color ? options.color : null;
  self.color = () => {
    if (_color !== null) {
      return _color;
    } else
    return randomColor();
  }
}