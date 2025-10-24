import Dimension from '@/core/models/dimension';

class CircleEngine {
  private gl: WebGLRenderingContext;
  constructor(canvas: HTMLCanvasElement, bounds: Dimension) {
    const gl: WebGLRenderingContext | null = canvas.getContext('webgl');
    if (gl === null) throw new Error('WebGL not supported');
    this.gl = gl;
  }
}

export default CircleEngine;
