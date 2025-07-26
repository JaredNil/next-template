import { useState } from "react";

import { useCommonActionsDecorator } from "./decorator/commonActionsDecorator";
import { useResolveRelativeStaticDecorator } from "./decorator/resolveRelative";
import { useZoomDecorator } from "./decorator/zoomDecorator";
import { type AddArrowViewState, useAddArrowViewModel } from "./variants/addArrow";
import {
  type AddStickerViewState,
  useAddStickerViewModel,
} from "./variants/addSticker";
import {
  type DrawArrowViewState,
  useDrawArrowViewModel,
} from "./variants/drawArrow";
import {
  type  EditStickerViewState,
  useEditStickerViewModel,
} from "./variants/editSticker";
import { goToIdle, type IdleViewState, useIdleViewModel } from "./variants/idle";
import {
  type NodesDraggingViewState,
  useNodesDraggingViewModel,
} from "./variants/nodesDragging";
import {
  type SelectionWindowViewState,
  useSelectionWindowViewModel,
} from "./variants/selectionWindow";
import {
  useWindowDraggingViewModel,
  type WindowDraggingViewState,
} from "./variants/windowDragging";
import { type ViewModelParams } from "./viewModelParams";
import { type ViewModel } from "./viewModelType";

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
