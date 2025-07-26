import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { useBoardFilters, useBoardsList, useCreateBoard } from "./hooks";
import {
  TemplatesGallery,
  TemplatesModal,
  useTemplatesModal,
} from "../board-templates";
import { BoardCard } from "./ui/board-card";
import { BoardItem } from "./ui/board-item";
import { BoardsSidebar } from "./ui/board-sidebar";
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
} from "./ui/boards-list-layout";
import { ViewModeToggle, type ViewMode } from "./ui/view-mode-toggle";
import { useDebouncedValue } from "@/shared/hooks";
import type { BoardSortOptions } from "@/shared/types";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";

function BoardsListPage() {
  const boardsFilters = useBoardFilters();
  const boardsQuery = useBoardsList({
    search: useDebouncedValue(boardsFilters.search, 300),
    sort: boardsFilters.sort,
  });

  const creatingBoard = useCreateBoard();

  const [viewMode, setViewMode] = useState("cards" as ViewMode);

  const templatesModal = useTemplatesModal();

  return (
    <>
      <TemplatesModal />
      <BoardsListLayout
        templates={<TemplatesGallery />}
        sidebar={<BoardsSidebar />}
        header={
          <BoardsListLayoutHeader
            title="Доски"
            description="Здесь вы можете рассматривать и управлять своими досками"
            actions={
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => templatesModal.open()}>
                  Выбрать шаблон
                </Button>
                <Button
                  disabled={creatingBoard.isPending}
                  onClick={creatingBoard.createBoard}
                >
                  <PlusIcon />
                  Создать доску
                </Button>
              </div>
            }
          />
        }
        filters={
          <BoardsListLayoutFilters
            sort={
              <Select
                value={boardsFilters.sort}
                onValueChange={(value) =>
                  boardsFilters.setSort(value as BoardSortOptions)
                }
              >
                <SelectTrigger id="sort" className="w-full">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastOpenedAt">По дате открытия</SelectItem>
                  <SelectItem value="createdAt">По дате создания</SelectItem>
                  <SelectItem value="updatedAt">По дате обновления</SelectItem>
                  <SelectItem value="name">По имени</SelectItem>
                </SelectContent>
              </Select>
            }
            filters={
              <Input
                id="search"
                placeholder="Введите название доски..."
                value={boardsFilters.search}
                onChange={(e) => boardsFilters.setSearch(e.target.value)}
                className="w-full"
              />
            }
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

export const Component = BoardsListPage;
