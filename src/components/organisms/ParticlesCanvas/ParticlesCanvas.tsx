'use client';
import React, { useEffect, useRef, useState } from 'react';
import './ParticlesCanvas.scss';
import PartclesEngine from '@/core/lib/ParticlesEngine/ParticlesEngine';
import Dimension from '@/core/models/dimension';

const ParticlesCanvas = (): React.ReactNode => {
  const containerRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> =
    useRef(null);
  const [particlesEngine, setParticlesEngine] = useState<PartclesEngine>();

  useEffect(() => {
    if (
      containerRef.current != null &&
      canvasRef.current != null &&
      particlesEngine == null
    ) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const divContainer: HTMLDivElement = containerRef.current;
      const bounds: Dimension = {
        x: divContainer.clientWidth,
        y: divContainer.clientHeight,
      };
      setParticlesEngine(new PartclesEngine(canvas, bounds));
    }
  }, [containerRef, canvasRef, particlesEngine]);

  return (
    <div ref={containerRef} className="particles">
      <canvas
        ref={canvasRef}
        width={containerRef.current?.clientWidth}
        height={containerRef.current?.clientHeight}
        className="particles particles--canvas"
      />
    </div>
  );
};

export default ParticlesCanvas;
