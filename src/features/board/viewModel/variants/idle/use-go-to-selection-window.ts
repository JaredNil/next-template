import type { IdleViewState } from '.';
import type { ViewModelParams } from '../../viewModelParams';
import { goToSelectionWindow } from '../selectionWindow';
import { distanceFromPoints } from '@/features/board/model/point';
import { pointOnScreenToCanvas } from '@/features/board/model/screenToCanvas';

export function useGoToSelectionWindow({
  setViewState,
  canvasRect,
  windowPositionModel,
}: ViewModelParams) {
  const handleWindowMouseMove = (idleState: IdleViewState, e: MouseEvent) => {
    if (
      idleState.mouseDown &&
      idleState.mouseDown.type === 'overlay' &&
      !idleState.mouseDown.isRightClick
    ) {
      const currentPoint = pointOnScreenToCanvas(
        {
          x: e.clientX,
          y: e.clientY,
        },
        windowPositionModel.position,
        canvasRect
      );

      if (distanceFromPoints(idleState.mouseDown, currentPoint) > 5) {
        setViewState(
          goToSelectionWindow({
            startPoint: idleState.mouseDown,
            endPoint: currentPoint,
            initialSelectedIds: e.shiftKey ? idleState.selectedIds : undefined,
          })
        );
      }
    }
  };

  return {
    handleWindowMouseMove,
  };
}
