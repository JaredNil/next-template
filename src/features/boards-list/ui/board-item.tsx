import { BoardsFavoriteToggle } from "./boards-favorite-toggle";
import { BoardsListItem } from "./boards-list-item";
import { useDeleteBoard } from "../hooks";
import { useUpdateFavorite } from "../hooks";
import type { ApiSchemas } from "@/shared/openapi/schema";
import { DropdownMenuItem } from "@/shared/ui/kit/dropdown-menu";

export function BoardItem({ board }: { board: ApiSchemas["Board"] }) {
  const deleteBoard = useDeleteBoard();
  const updateFavorite = useUpdateFavorite();

  return (
    <BoardsListItem
      key={board.id}
      board={board}
      rightActions={
        <BoardsFavoriteToggle
          isFavorite={updateFavorite.isOptimisticFavorite(board)}
          onToggle={() => updateFavorite.toggle(board)}
        />
      }
      menuActions={
        <DropdownMenuItem
          variant="destructive"
          disabled={deleteBoard.isPending(board.id)}
          onClick={() => deleteBoard.deleteBoard(board.id)}
        >
          Удалить
        </DropdownMenuItem>
      }
    />
  );
}
