import { ArrowRightIcon, StickerIcon } from 'lucide-react';

import { useCanvasRect } from './hooks/useCanvasRect';
import { useLayoutFocus } from './hooks/useLayoutFocus';
import { useNodesDimensions } from './hooks/useNodesDimensions';
import { useWindowEvents } from './hooks/useWindowEvents';
import { useNodes } from './model/nodes';
import { useWindowPositionModel } from './model/windowPosition';
import { ActionButton } from './ui/actionButton';
import { Actions } from './ui/actions';
import { Canvas } from './ui/canvas';
import { Dots } from './ui/dots';
import { Layout } from './ui/layout';
import { Arrow } from './ui/nodes/arrow';
import { Sticker } from './ui/nodes/sticker';
import { Overlay } from './ui/overlay';
import { SelectionWindow } from './ui/selectionWindow';
import { useViewModel } from './viewModel/useViewModel';

function BoardPage() {
  const nodesModel = useNodes();
  const windowPositionModel = useWindowPositionModel();
  const focusLayoutRef = useLayoutFocus();
  const { canvasRef, canvasRect } = useCanvasRect();
  const { nodeRef, nodesDimensions } = useNodesDimensions();

  const viewModel = useViewModel({
    nodesModel,
    canvasRect,
    nodesDimensions,
    windowPositionModel,
  });

  useWindowEvents(viewModel);

  const windowPosition =
    viewModel.windowPosition ?? windowPositionModel.position;

  return (
    <Layout ref={focusLayoutRef} onKeyDown={viewModel.layout?.onKeyDown}>
      <Dots windowPosition={windowPosition} />

      <Canvas
        ref={canvasRef}
        overlay={
          <Overlay
            onClick={viewModel.overlay?.onClick}
            onMouseDown={viewModel.overlay?.onMouseDown}
            onMouseUp={viewModel.overlay?.onMouseUp}
          />
        }
        onClick={viewModel.canvas?.onClick}
        windowPosition={windowPosition}
      >
        {viewModel.nodes.map((node) => {
          if (node.type === 'sticker') {
            return <Sticker key={node.id} {...node} ref={nodeRef} />;
          }
          if (node.type === 'arrow') {
            return <Arrow key={node.id} {...node} ref={nodeRef} />;
          }
        })}
        {viewModel.selectionWindow && (
          <SelectionWindow {...viewModel.selectionWindow} />
        )}
      </Canvas>

      <Actions>
        <ActionButton
          isActive={viewModel.actions?.addSticker?.isActive}
          onClick={viewModel.actions?.addSticker?.onClick}
        >
          <StickerIcon />
        </ActionButton>
        <ActionButton
          isActive={viewModel.actions?.addArrow?.isActive}
          onClick={viewModel.actions?.addArrow?.onClick}
        >
          <ArrowRightIcon />
        </ActionButton>
      </Actions>
    </Layout>
  );
}

export const Component = BoardPage;
