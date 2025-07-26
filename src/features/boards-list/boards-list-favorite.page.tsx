import { useState } from "react";

import { useBoardsList } from "./hooks";
import { BoardCard } from "./ui/board-card";
import { BoardItem } from "./ui/board-item";
import { BoardsSidebar } from "./ui/board-sidebar";
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutHeader,
} from "./ui/boards-list-layout";
import { ViewModeToggle, type ViewMode } from "./ui/view-mode-toggle";

function BoardsListFavoritePage() {
  const boardsQuery = useBoardsList({
    isFavorite: true,
  });

  const [viewMode, setViewMode] = useState("cards" as ViewMode);

  return (
    <>
      <BoardsListLayout
        sidebar={<BoardsSidebar />}
        header={
          <BoardsListLayoutHeader
            title="Избранное"
            description="Здесь вы можете рассматривать и управлять своими досками"
            actions={
              <ViewModeToggle
                onChange={(value) => setViewMode(value)}
                value={viewMode}
              />
            }
          />
        }
      >
        <BoardsListLayoutContent
          isEmpty={boardsQuery.boards.length === 0}
          isPending={boardsQuery.isPending}
          isPendingNext={boardsQuery.isFetchingNextPage}
          cursorRef={boardsQuery.cursorRef}
          hasCursor={boardsQuery.hasNextPage}
          mode={viewMode}
          renderList={() =>
            boardsQuery.boards.map((board) => (
              <BoardItem key={board.id} board={board} />
            ))
          }
          renderGrid={() =>
            boardsQuery.boards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))
          }
        />
      </BoardsListLayout>
    </>
  );
}

export const Component = BoardsListFavoritePage;
