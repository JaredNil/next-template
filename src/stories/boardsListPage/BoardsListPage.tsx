import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { BoardCard } from '../../features/boards-list/ui/boardCard';
import { BoardItem } from '../../features/boards-list/ui/boardItem';
import { BoardsSidebar } from '../../features/boards-list/ui/boardSidebar';
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
} from '../../features/boards-list/ui/boardsListLayout';
import {
  ViewModeToggle,
  type ViewMode,
} from '../../features/boards-list/ui/viewModeToggle';
import { Button } from '../../shared/ui/kit/button';
import { Input } from '../../shared/ui/kit/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../shared/ui/kit/select';
import type { ApiSchemas } from '../../shared/openapi/schema';

// Mock data for stories
const mockBoards: ApiSchemas['Board'][] = [
  {
    id: '1',
    name: 'Моя первая доска',
    createdAt: '2024-01-15T10:00:00Z',
    lastOpenedAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Проект разработки',
    createdAt: '2024-01-10T09:00:00Z',
    lastOpenedAt: '2024-01-19T16:45:00Z',
    updatedAt: '2024-01-19T16:45:00Z',
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Планирование задач',
    createdAt: '2024-01-05T11:30:00Z',
    lastOpenedAt: '2024-01-18T13:20:00Z',
    updatedAt: '2024-01-18T13:20:00Z',
    isFavorite: true,
  },
];

export function BoardsListPage() {
  const [viewMode, setViewMode] = useState('cards' as ViewMode);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('lastOpenedAt');

  return (
    <>
      <BoardsListLayout
        sidebar={<BoardsSidebar />}
        header={
          <BoardsListLayoutHeader
            title="Доски"
            description="Здесь вы можете рассматривать и управлять своими досками"
            actions={
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {}}>
                  Выбрать шаблон
                </Button>
                <Button onClick={() => {}}>
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
              <Select value={sort} onValueChange={setSort}>
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
          isEmpty={mockBoards.length === 0}
          isPending={false}
          isPendingNext={false}
          cursorRef={() => {}}
          hasCursor={false}
          mode={viewMode}
          renderList={() =>
            mockBoards.map((board) => (
              <BoardItem key={board.id} board={board} />
            ))
          }
          renderGrid={() =>
            mockBoards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))
          }
        />
      </BoardsListLayout>
    </>
  );
}
