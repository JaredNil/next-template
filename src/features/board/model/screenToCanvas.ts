import type { WindowPosition } from "../domain/windowPosition";

export function pointOnScreenToCanvas(
  point: { x: number; y: number },
  windowPosition: WindowPosition,
  canvasRect?: {
    x: number;
    y: number;
  },
) {
  if (!canvasRect) return point;
  return {
    x: (point.x - canvasRect.x) / windowPosition.zoom + windowPosition.x,
    y: (point.y - canvasRect.y) / windowPosition.zoom + windowPosition.y,
  };
}
