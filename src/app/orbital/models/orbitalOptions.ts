import Utils from '../../utils/utils';

const defaultOptions = {
  sun: {
    level: 1,
    radius: 25,
    color: '#FDB813',
    useRandomColor: false
  },
  planet: {
    level: 2,
    radius: 15,
    minSize: 10,
    maxSize: 15,
    minDistance: 20,
    maxDistance: 100,
    minCount: 1,
    maxCount: 6,
    useRandomColor: true
  },
  moon: {
    level: 3,
    radius: 5,
    minSize: 2,
    maxSize: 7,
    minDistance: 10,
    maxDistance: 30,
    minCount: 0,
    maxCount: 3,
    color: '#d3d3d3',
    useRandomColor: false
  }
};

export class OrbitalOptions {
  orbitalType: string;
  level: number;
  radius: number;
  minSize: number;
  maxSize: number;
  minDistance: number;
  maxDistance: number;
  minCount: number;
  maxCount: number;
  private _color: string;
  private _useRandomColor: boolean;

  constructor(orbitalType: string) {
    this.orbitalType = orbitalType;
    this.create();
  }

  count(): number {
    return Utils.randomInt(this.minCount, this.maxCount);
  }

  color(): string {
    return this._useRandomColor ? Utils.randomColor() : this._color;
  }

  create() {
    let cachedOptions = localStorage.getItem(this.orbitalType);
    let options = cachedOptions ? JSON.parse(cachedOptions) : defaultOptions[this.orbitalType];

    this.level = options.level;
    this.radius = options.radius;
    this.minSize = options.minSize;
    this.maxSize = options.maxSize;
    this.minDistance = options.minDistance;
    this.maxDistance = options.maxDistance;
    this.minCount = options.minCount;
    this.maxCount = options.maxCount;
    this._color = options.color;
    this._useRandomColor = options.useRandomColor;
  }

  save(useDefault?: boolean) {
    let options;
    if (useDefault) {
      options = defaultOptions[this.orbitalType];
    } else {
      options = {
        level: this.level,
        radius: this.radius,
        minSize: this.minSize,
        maxSize: this.maxSize,
        minDistance: this.minDistance,
        maxDistance: this.maxDistance,
        minCount: this.minCount,
        maxCount: this.maxCount,
        color: this.color(),
        useRandomColor: this._useRandomColor
      };
    }
    localStorage.setItem(this.orbitalType, JSON.stringify(options));
  }
}
