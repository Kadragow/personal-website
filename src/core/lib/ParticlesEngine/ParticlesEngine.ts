import Dimension from '../../models/dimension';
import Particle from './Particle';
import { hexToRgb } from '../helpers/colors';
import { getCssVariable } from '../helpers/variable';

const ANIMATION_INTERVAL = 5;
const MAX_RANGE = 150;
const PARTICLES_AMOUNT = 150;
export default class PartclesEngine {
  private bounds: Dimension;
  private mousePos: Dimension | null = null;
  private context: CanvasRenderingContext2D | null;
  public particles: Particle[] = [];
  public intervalAnimation!: NodeJS.Timeout;

  constructor(canvas: HTMLCanvasElement, bounds: Dimension) {
    this.context = canvas.getContext('2d');
    this.bounds = bounds;

    this.spawnParticles();
    this.handleMouse(canvas);
    this.animate();
  }

  private handleMouse(canvas: HTMLCanvasElement) {
    window.onmousemove = (evt: MouseEvent) => {
      var rect = canvas.getBoundingClientRect();
      this.mousePos = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    };
  }

  private spawnParticles(): void {
    for (let i = 0; i < PARTICLES_AMOUNT; i++) {
      this.particles.push(new Particle(this.bounds));
    }
  }

  private drawParticle(p: Particle): void {
    if (!this.context) return;
    const cssColor = getCssVariable('--text');
    const particleColor = hexToRgb(cssColor);
    this.context.strokeStyle = `rgba(${particleColor}, ${p.strength})`;
    this.context.lineWidth = p.strength;
    this.context.beginPath();
    this.context.moveTo(p.position.x, p.position.y);
    this.context.lineTo(p.position.x, p.position.y);
    this.context.stroke();
  }

  private drawLine(p1: Particle, p2: Particle): void {
    if (!this.context) return;
    const maxDist = Math.min(this.bounds.x / 5, MAX_RANGE);
    const distance = Math.hypot(
      p2.position.x - p1.position.x,
      p2.position.y - p1.position.y
    );

    if (distance > maxDist) return;

    const opacity = Math.min(
      p1.strength * p2.strength * (1 - distance / maxDist),
      1
    );

    const cssColor = getCssVariable('--text');
    const lineColor = hexToRgb(cssColor);
    this.context.strokeStyle = `rgba(${lineColor}, ${opacity})`;
    this.context.lineWidth = 1;
    this.context.beginPath();
    this.context.moveTo(p1.position.x, p1.position.y);
    this.context.lineTo(p2.position.x, p2.position.y);
    this.context.stroke();

    // Its here due to max distance breakpoint
    // p1.addGravityVelocity(p2);
  }

  private draw(): void {
    if (!this.context) return;
    this.context.lineCap = 'round';
    this.context.clearRect(0, 0, this.bounds.x, this.bounds.y);

    const connectedPartices: { [key: string]: boolean } = {};

    this.particles.forEach((p1: Particle, idx1: number): void => {
      p1.move();
      this.drawParticle(p1);
      this.particles.forEach((p2: Particle, idx2: number): void => {
        const pair: string = `${idx1}-${idx2}`;
        const reversedPair: string = `${idx2}-${idx1}`;

        if (connectedPartices[pair] || connectedPartices[reversedPair]) return;
        connectedPartices[pair] = true;
        connectedPartices[reversedPair] = true;
        this.drawLine(p1, p2);
      });
    });

    if (!this.mousePos) return;
    const cssColor = getCssVariable('--text');
    const particleColor = hexToRgb(cssColor);
    this.context.strokeStyle = `rgba(${particleColor}, 1)`;
    this.context.lineWidth = 10;
    this.context.beginPath();
    this.context.moveTo(this.mousePos.x, this.mousePos.y);
    this.context.lineTo(this.mousePos.x, this.mousePos.y);
    this.context.stroke();
  }

  private animate(): void {
    this.intervalAnimation = setInterval(() => this.draw(), ANIMATION_INTERVAL);
  }

  public clear(): void {
    clearInterval(this.intervalAnimation);
  }

  public reset(): void {
    this.clear();
    this.animate();
  }
}
