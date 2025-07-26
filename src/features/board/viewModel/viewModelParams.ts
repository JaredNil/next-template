import type { Dispatch } from 'react';
import type { SetStateAction } from 'react';

import type { ViewState } from './useViewModel';
import type { CanvasRect } from '../hooks/useCanvasRect';
import type { NodesDimensionsMap } from '../hooks/useNodesDimensions';
import type { NodesModel } from '../model/nodes';
import type { WindowPositionModel } from '../model/windowPosition';

export type ViewModelParams = {
  setViewState: Dispatch<SetStateAction<ViewState>>;
  nodesModel: NodesModel;
  canvasRect: CanvasRect | undefined;
  nodesDimensions: NodesDimensionsMap;
  windowPositionModel: WindowPositionModel;
};
