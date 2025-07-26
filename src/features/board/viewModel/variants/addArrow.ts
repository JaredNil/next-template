import React from "react";

import { pointOnScreenToCanvas } from "../../model/screenToCanvas";
import type { ViewModelParams } from "../viewModelParams";
import type { ViewModel } from "../viewModelType";
import { goToDrawArrow } from "./drawArrow";
import { goToIdle } from "./idle";

export type AddArrowViewState = {
  type: "add-arrow";
};

export function useAddArrowViewModel({
  nodesModel,
  setViewState,
  windowPositionModel,
  canvasRect,
}: ViewModelParams) {
  return (): ViewModel => ({
    nodes: nodesModel.nodes.map((node) => {
      if (node.type === "sticker") {
        return {
          ...node,
          onMouseDown: (e: React.MouseEvent) => {
            const point = pointOnScreenToCanvas(
              { x: e.clientX, y: e.clientY },
              windowPositionModel.position,
              canvasRect,
            );

            setViewState(goToDrawArrow(point, node.id));
          },
        };
      }
      return node;
    }),
    layout: {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          setViewState(goToIdle());
        }
      },
    },
    overlay: {
      onMouseDown: (e) =>
        setViewState(
          goToDrawArrow(
            pointOnScreenToCanvas(
              { x: e.clientX, y: e.clientY },
              windowPositionModel.position,
              canvasRect,
            ),
          ),
        ),
    },
    actions: {
      addArrow: {
        isActive: true,
        onClick: () => setViewState(goToIdle()),
      },
    },
  });
}

export function goToAddArrow(): AddArrowViewState {
  return {
    type: "add-arrow",
  };
}
