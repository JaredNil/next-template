import { useMemo } from 'react';

import type { Node } from '../../model/nodes';
import {
  isRelativePoint,
  type RelativeBase,
  resolveRelativePoint,
} from '../../model/point';
import type { ViewModel } from '../viewModelType';

export function createRelativeBase(nodes: Node[]): RelativeBase {
  const base = Object.fromEntries(
    nodes
      .filter((node) => node.type === 'sticker')
      .map((node) => [node.id, node])
  );
  return base;
}

export function resolveRelativePoints(
  nodes: Node[],
  relativeBase: RelativeBase
): Node[] {
  return nodes.map((node) => {
    let newNode = node;

    if (newNode.type === 'arrow' && isRelativePoint(newNode.start)) {
      newNode = {
        ...newNode,
        start: resolveRelativePoint(relativeBase, newNode.start),
      };
    }

    if (newNode.type === 'arrow' && isRelativePoint(newNode.end)) {
      newNode = {
        ...newNode,
        end: resolveRelativePoint(relativeBase, newNode.end),
      };
    }

    return newNode;
  });
}

export function useResolveRelativeStaticDecorator(
  viewModel: ViewModel
): ViewModel {
  const nodes = useMemo(() => {
    const relativeBase = createRelativeBase(viewModel.nodes);
    return resolveRelativePoints(viewModel.nodes, relativeBase);
  }, [viewModel.nodes]);

  return {
    ...viewModel,
    nodes,
  };
}
