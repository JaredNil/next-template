import type { Dispatch } from "react";
import type { SetStateAction } from "react";

import type { ViewState } from "./use-view-model";
import type { CanvasRect } from "../hooks/use-canvas-rect";
import type { NodesDimensionsMap } from "../hooks/use-nodes-dimensions";
import type { NodesModel } from "../model/nodes";
import type { WindowPositionModel } from "../model/window-position";

export type ViewModelParams = {
  setViewState: Dispatch<SetStateAction<ViewState>>;
  nodesModel: NodesModel;
  canvasRect: CanvasRect | undefined;
  nodesDimensions: NodesDimensionsMap;
  windowPositionModel: WindowPositionModel;
};
