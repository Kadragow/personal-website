import Dimension from '../../models/dimension';

const G = 10.006;
const AGING: number = 0.2137;
const BOUNDS_OFFSET: number = 5;
const MAX_AGE_PULL: number = 100;
const MIN_AGE_PULL: number = 10;
const MAX_SPEED: number = 0.5;
const MIN_SPEED: number = 0.5;
export default class Particle {
  public position!: Dimension;
  public speed!: Dimension;
  public bounds!: Dimension;
  public age!: number;
  public maxAge!: number;
  public reachedMaxAge!: boolean;

  constructor(bounds: Dimension) {
    this.bounds = bounds;
    this.init();
  }

  private init(respawn: boolean = false) {
    this.position = {
      x: Math.random() * (this.bounds.x - BOUNDS_OFFSET) + BOUNDS_OFFSET,
      y: Math.random() * (this.bounds.y - BOUNDS_OFFSET) + BOUNDS_OFFSET,
    };

    this.speed = {
      x: Math.random() * (MAX_SPEED + MIN_SPEED) - MIN_SPEED,
      y: Math.random() * (MAX_SPEED + MIN_SPEED) - MIN_SPEED,
    };

    this.age = respawn ? 0 : Math.random() * MAX_AGE_PULL + MIN_AGE_PULL;
    this.maxAge = Math.random() * MAX_AGE_PULL + MIN_AGE_PULL;
    this.reachedMaxAge = respawn ? false : Math.random() < 0.5;
  }

  public get cycleFinished(): boolean {
    return this.age <= 0;
  }

  public get strength(): number {
    return this.age / this.maxAge;
  }

  public move() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    if (this.age >= this.maxAge) this.reachedMaxAge = true;

    if (!this.reachedMaxAge) this.age += AGING;
    else this.age -= AGING;

    if (
      this.position.x > this.bounds.x - BOUNDS_OFFSET ||
      this.position.x < BOUNDS_OFFSET
    ) {
      this.speed.x = -this.speed.x;
    }

    if (
      this.position.y > this.bounds.y - BOUNDS_OFFSET ||
      this.position.y < BOUNDS_OFFSET
    ) {
      this.speed.y = -this.speed.y;
    }

    if (this.cycleFinished) this.init(true);
  }

  // TODO: implement this correctly
  public addGravityVelocity(p: Particle) {
    const ySign = Math.sign(this.position.y - p.position.y);
    const xSign = Math.sign(this.position.x - p.position.x);
    const vInc = p.strength * this.strength * G;

    if (
      (xSign && this.speed.x < MAX_SPEED) ||
      (!xSign && this.speed.x > -MAX_SPEED)
    )
      this.speed.x = this.speed.x + xSign * vInc;

    if (
      (ySign && this.speed.y < MAX_SPEED) ||
      (!ySign && this.speed.y > -MAX_SPEED)
    )
      this.speed.y = this.speed.y + ySign * vInc;
  }
}

export class MouseParticle extends Particle {
  constructor(bounds: Dimension) {
    super(bounds);

    this.speed = {
      x: 0,
      y: 0,
    };

    this.age = 100;
    this.maxAge = Infinity;
    this.reachedMaxAge = false;
  }
}
