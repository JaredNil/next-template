import { BoardsFavoriteToggle } from "./boardsFavoriteToggle";
import { BoardsListCard } from "./boardsListCard";
import { useDeleteBoard } from "../hooks";
import { useUpdateFavorite } from "../hooks";
import type { ApiSchemas } from "@/shared/openapi/schema";
import { Button } from "@/shared/ui/kit/button";

export function BoardCard({ board }: { board: ApiSchemas["Board"] }) {
  const deleteBoard = useDeleteBoard();
  const updateFavorite = useUpdateFavorite();

  return (
    <BoardsListCard
      key={board.id}
      board={board}
      rightTopActions={
        <BoardsFavoriteToggle
          isFavorite={updateFavorite.isOptimisticFavorite(board)}
          onToggle={() => updateFavorite.toggle(board)}
        />
      }
      bottomActions={
        <Button
          variant="destructive"
          disabled={deleteBoard.isPending(board.id)}
          onClick={() => deleteBoard.deleteBoard(board.id)}
        >
          Удалить
        </Button>
      }
    />
  );
}
