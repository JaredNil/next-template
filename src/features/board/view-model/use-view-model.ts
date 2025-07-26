import { useState } from "react";

import { useCommonActionsDecorator } from "./decorator/common-actions";
import { useResolveRelativeStaticDecorator } from "./decorator/resolve-relative";
import { useZoomDecorator } from "./decorator/zoom";
import { type AddArrowViewState, useAddArrowViewModel } from "./variants/add-arrow";
import {
  type AddStickerViewState,
  useAddStickerViewModel,
} from "./variants/add-sticker";
import {
  type DrawArrowViewState,
  useDrawArrowViewModel,
} from "./variants/draw-arrow";
import {
  type  EditStickerViewState,
  useEditStickerViewModel,
} from "./variants/edit-sticker";
import { goToIdle, type IdleViewState, useIdleViewModel } from "./variants/idle";
import {
  type NodesDraggingViewState,
  useNodesDraggingViewModel,
} from "./variants/nodes-dragging";
import {
  type SelectionWindowViewState,
  useSelectionWindowViewModel,
} from "./variants/selection-window";
import {
  useWindowDraggingViewModel,
  type WindowDraggingViewState,
} from "./variants/window-dragging";
import { type ViewModelParams } from "./view-model-params";
import { type ViewModel } from "./view-model-type";

export type ViewState =
  | AddArrowViewState
  | AddStickerViewState
  | DrawArrowViewState
  | EditStickerViewState
  | IdleViewState
  | SelectionWindowViewState
  | NodesDraggingViewState
  | WindowDraggingViewState;

export function useViewModel(params: Omit<ViewModelParams, "setViewState">) {
  const [viewState, setViewState] = useState<ViewState>(() => goToIdle());

  const newParams = {
    ...params,
    setViewState,
  };

  const addArrowViewModel = useAddArrowViewModel(newParams);
  const drawArrowViewModel = useDrawArrowViewModel(newParams);
  const addStickerViewModel = useAddStickerViewModel(newParams);
  const editStickerViewModel = useEditStickerViewModel(newParams);
  const idleViewModel = useIdleViewModel(newParams);
  const selectionWindowViewModel = useSelectionWindowViewModel(newParams);
  const nodesDraggingViewModel = useNodesDraggingViewModel(newParams);
  const windowDraggingViewModel = useWindowDraggingViewModel(newParams);

  const zoomDecorator = useZoomDecorator(newParams);
  const commonActionsDecorator = useCommonActionsDecorator(newParams);

  let viewModel: ViewModel;
  switch (viewState.type) {
    case "idle": {
      viewModel = idleViewModel(viewState);
      viewModel = commonActionsDecorator(viewModel);
      break;
    }
    case "add-arrow": {
      viewModel = addArrowViewModel();
      viewModel = commonActionsDecorator(viewModel);
      break;
    }

    case "add-sticker": {
      viewModel = addStickerViewModel();
      viewModel = commonActionsDecorator(viewModel);
      break;
    }
    case "draw-arrow": {
      viewModel = drawArrowViewModel(viewState);
      break;
    }
    case "edit-sticker": {
      viewModel = editStickerViewModel(viewState);
      break;
    }
    case "selection-window": {
      viewModel = selectionWindowViewModel(viewState);
      break;
    }
    case "nodes-dragging": {
      viewModel = nodesDraggingViewModel(viewState);
      break;
    }
    case "window-dragging": {
      viewModel = windowDraggingViewModel(viewState);
      break;
    }
    default:
      throw new Error("Invalid view state");
  }

  viewModel = zoomDecorator(viewModel);
  viewModel = useResolveRelativeStaticDecorator(viewModel);

  return viewModel;
}
