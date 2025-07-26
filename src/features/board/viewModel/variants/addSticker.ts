import { pointOnScreenToCanvas } from "../../model/screenToCanvas";
import type { ViewModelParams } from "../viewModelParams";
import type { ViewModel } from "../viewModelType";
import { goToIdle } from "./idle";

export type AddStickerViewState = {
  type: "add-sticker";
};

export function useAddStickerViewModel({
  nodesModel,
  setViewState,
  canvasRect,
  windowPositionModel,
}: ViewModelParams) {
  return (): ViewModel => ({
    nodes: nodesModel.nodes,
    layout: {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          setViewState(goToIdle());
        }
      },
    },
    canvas: {
      onClick: (e) => {
        if (!canvasRect) return;

        const point = pointOnScreenToCanvas(
          { x: e.clientX, y: e.clientY },
          windowPositionModel.position,
          canvasRect,
        );

        nodesModel.addSticker({
          text: "Default",
          x: point.x,
          y: point.y,
        });
        setViewState(goToIdle());
      },
    },
    actions: {
      addSticker: {
        isActive: true,
        onClick: () => setViewState(goToIdle()),
      },
    },
  });
}

export function goToAddSticker(): AddStickerViewState {
  return {
    type: "add-sticker",
  };
}
