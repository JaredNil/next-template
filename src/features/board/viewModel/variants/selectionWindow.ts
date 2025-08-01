import { type Point, resolveRelativePoint } from '../../model/point';
import {
  createRectFromDimensions,
  createRectFromPoints,
  isRectsIntersecting,
  type Rect,
} from '../../model/rect';
import { pointOnScreenToCanvas } from '../../model/screenToCanvas';
import { selectItems } from '../../model/selection';
import { createRelativeBase } from '../decorator/resolveRelative';
import type { ViewModelParams } from '../viewModelParams';
import type { ViewModel } from '../viewModelType';
import { goToIdle } from './idle';

export type SelectionWindowViewState = {
  type: 'selection-window';
  startPoint: Point;
  endPoint: Point;
  initialSelectedIds: Set<string>;
};

export function useSelectionWindowViewModel({
  nodesModel,
  setViewState,
  canvasRect,
  nodesDimensions,
  windowPositionModel,
}: ViewModelParams) {
  const getNodes = (state: SelectionWindowViewState, selectionRect: Rect) => {
    const relativeBase = createRelativeBase(nodesModel.nodes);

    return nodesModel.nodes.map((node) => {
      const nodeDimensions = nodesDimensions[node.id];
      const nodeRect =
        node.type === 'sticker'
          ? createRectFromDimensions(node, nodeDimensions)
          : createRectFromPoints(
              resolveRelativePoint(relativeBase, node.start),
              resolveRelativePoint(relativeBase, node.end)
            );

      return {
        ...node,
        isSelected:
          isRectsIntersecting(nodeRect, selectionRect) ||
          state.initialSelectedIds.has(node.id),
      };
    });
  };

  return (state: SelectionWindowViewState): ViewModel => {
    const rect = createRectFromPoints(state.startPoint, state.endPoint);
    const nodes = getNodes(state, rect);

    return {
      selectionWindow: rect,
      nodes,
      window: {
        onMouseMove: (e) => {
          const currentPoint = pointOnScreenToCanvas(
            {
              x: e.clientX,
              y: e.clientY,
            },
            windowPositionModel.position,
            canvasRect
          );
          setViewState({
            ...state,
            endPoint: currentPoint,
          });
        },
        onMouseUp: () => {
          const nodesIdsInRect = nodes
            .filter((node) => node.isSelected)
            .map((node) => node.id);

          setViewState(
            goToIdle({
              selectedIds: selectItems(
                state.initialSelectedIds,
                nodesIdsInRect,
                'add'
              ),
            })
          );
        },
      },
    };
  };
}

export function goToSelectionWindow({
  endPoint,
  startPoint,
  initialSelectedIds,
}: {
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  initialSelectedIds?: Set<string>;
}): SelectionWindowViewState {
  return {
    type: 'selection-window',
    startPoint,
    endPoint,
    initialSelectedIds: initialSelectedIds ?? new Set(),
  };
}
