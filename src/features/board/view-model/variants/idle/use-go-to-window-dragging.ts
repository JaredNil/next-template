import type { IdleViewState } from ".";
import type { ViewModelParams } from "../../view-model-params";
import { goToWindowDragging } from "../window-dragging";
import { distanceFromPoints } from "@/features/board/domain/point";
import { pointOnScreenToCanvas } from "@/features/board/domain/screen-to-canvas";

export function useGoToWindowDragging({
  canvasRect,
  setViewState,
  windowPositionModel,
}: ViewModelParams) {
  const handleWindowMouseMove = (idleState: IdleViewState, e: MouseEvent) => {
    if (idleState.mouseDown && idleState.mouseDown.isRightClick) {
      const currentPoint = pointOnScreenToCanvas(
        {
          x: e.clientX,
          y: e.clientY,
        },
        windowPositionModel.position,
        canvasRect,
      );

      if (distanceFromPoints(idleState.mouseDown, currentPoint) > 5) {
        setViewState(
          goToWindowDragging({
            startPoint: idleState.mouseDown,
            endPoint: currentPoint,
          }),
        );
      }
    }
  };

  return {
    handleWindowMouseMove,
  };
}
