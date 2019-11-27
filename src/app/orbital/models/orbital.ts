import { Vector } from '../../utils/vector';
import Utils from '../../utils/utils';
import { Renderer } from '../../utils/renderer/renderer.component';

import { OrbitalOptions } from './orbitalOptions';

export class Orbital {
  position: Vector;// = new Vector(0, 0);
  name = 'Orbital';
  parentOrbital: Orbital;
  radius: number;
  distance: number;
  level: number;
  color: string;
  children: Array<Orbital>;
  speed: number;
  angle: number;

	/**
	 * Constructor for an Orbital
	 * @param options The OrbitalOptions for this Orbital
	 * @param distance The distance between this orbital and its parent.
	 * @param radius The radius of this orbital. If this is not supplied, the radius from the OrbitalOptions will be used instead.
	 */
  constructor(options: OrbitalOptions, distance: number, x: number, y: number, radius?: number) {
    this.distance = distance;
    this.position = new Vector(x, y);
    this.radius = radius ? radius : options.radius;
    this.level = options.level;
    this.color = options.color();
    this.children = new Array<Orbital>();
    this.speed = Utils.random(0.02, 0.04);
    this.angle = Utils.random(0, Math.PI);
  }

	/**
	 * Recursivly creates children for this orbital. This will usually only need to be called from the parent orbital.
	 * @param options A list of all the options for different orbitals. Typically something like options for the sun, options for planets, and options for moons.
	 */
  createChildren(options: OrbitalOptions[]) {
    let levelOption = options[this.level];
    let minSize = levelOption.minSize,
      maxSize = levelOption.maxSize,
      minDistance = levelOption.minDistance,
      maxDistance = levelOption.maxDistance,
      count = levelOption.count();

    let previousDistance = 0;
    for (let i = 0; i < count; i++) {
      let max = maxSize * (0.3 * i);
      if (max < minSize) {
        max = minSize + 1;
      }

      let radius = Utils.randomInt(minSize, max);
      let distance = Utils.randomInt(minDistance, maxDistance) + previousDistance;

      // The x and y of a child will be set in update()
      let child = new Orbital(levelOption, distance, 0, 0, radius);
      this.children.push(child);

      if (this.level < 2) {
        child.createChildren(options);
      }
    }
  }

  setName(name: string) {
    this.name = name;
  }

  update(parent?: Orbital) {
    this.angle += this.speed;
    if (parent) {
      let r = this.radius + this.distance + (parent.radius * 0.5);
      this.position.x = parent.position.x + r * Math.cos(this.angle);
      this.position.y = parent.position.y + r * Math.sin(this.angle);
    }
  }

  render(renderer: Renderer, parent?: Orbital) {
    renderer.ellipse(this.position.x, this.position.y, this.radius, this.color);
  }

}
