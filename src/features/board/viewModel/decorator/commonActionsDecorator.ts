import { goToAddArrow } from '../variants/addArrow';
import { goToAddSticker } from '../variants/addSticker';
import type { ViewModelParams } from '../viewModelParams';
import type { ViewModel } from '../viewModelType';

export function useCommonActionsDecorator({ setViewState }: ViewModelParams) {
  return (viewModel: ViewModel): ViewModel => {
    return {
      ...viewModel,
      layout: {
        ...viewModel.layout,
        onKeyDown: (e) => {
          viewModel.layout?.onKeyDown?.(e);
          if (e.key === 's') {
            setViewState(goToAddSticker());
          }
          if (e.key === 'a') {
            setViewState(goToAddArrow());
          }
        },
      },
      actions: {
        addArrow: {
          isActive: false,
          onClick: () => setViewState(goToAddArrow()),
        },
        addSticker: {
          isActive: false,
          onClick: () => setViewState(goToAddSticker()),
        },
        ...viewModel.actions,
      },
    };
  };
}
