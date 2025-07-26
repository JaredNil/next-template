import type { ViewModelParams } from "../../viewModelParams";
import { goToAddSticker } from "../addSticker";

export function useGoToAddSticker(params: ViewModelParams) {
  const { setViewState } = params;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "s") {
      setViewState(goToAddSticker());
    }
  };

  const handleActionClick = () => {
    setViewState(goToAddSticker());
  };

  return {
    handleKeyDown,
    handleActionClick,
  };
}
