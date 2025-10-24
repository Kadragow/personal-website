import Dimension from '@/core/models/dimension';

export const getMousePos = (
  canvas: HTMLCanvasElement,
  evt: MouseEvent
): Dimension => {
  var rect = canvas.getBoundingClientRect();

  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
};
