import { useDeleteBoard } from '../../features/boards-list/hooks';
import { useUpdateFavorite } from '../../features/boards-list/hooks';
import { BoardsFavoriteToggle } from '../../features/boards-list/ui/boardsFavoriteToggle';
import { BoardsListCard } from '../../features/boards-list/ui/boardsListCard';
import type { ApiSchemas } from '../../shared/openapi/schema';
import { Button } from '../../shared/ui/kit/button';

export function BoardCard({ board }: { board: ApiSchemas['Board'] }) {
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
