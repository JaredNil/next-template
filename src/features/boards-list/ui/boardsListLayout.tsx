import type { ReactNode } from 'react';

import type { ViewMode } from './viewModeToggle';
import { Skeleton } from '@/shared/ui/kit/skeleton';

export function BoardsListLayout({
  children,
  header,
  filters,
  sidebar,
  templates,
}: {
  children?: ReactNode;
  header?: ReactNode;
  filters?: ReactNode;
  sidebar?: ReactNode;
  templates?: ReactNode;
}) {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <div className="flex gap-4">
        {sidebar}
        <div className="flex-1">
          {templates && (
            <div className="rounded-md bg-gray-100 p-4">{templates}</div>
          )}
          {header}
          {filters}
          {children}
        </div>
      </div>
    </div>
  );
}

export function BoardsListLayoutHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export function BoardsListLayoutFilters({
  sort,
  filters,
  actions,
}: {
  sort?: ReactNode;
  filters?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      {filters && (
        <div className="flex items-center gap-4">
          <span>Filter by</span>
          {filters}
        </div>
      )}
      {sort && (
        <div className="flex items-center gap-4">
          <span>Sort by</span>
          {sort}
        </div>
      )}
      {actions && <div className="ml-auto">{actions}</div>}
    </div>
  );
}

export function BoardsListLayoutContent({
  children,
  cursorRef,
  hasCursor,
  isEmpty,
  isPending,
  isPendingNext,
  mode,
  renderList,
  renderGrid,
}: {
  children?: React.ReactNode;
  isEmpty?: boolean;
  isPending?: boolean;
  isPendingNext?: boolean;
  cursorRef?: React.Ref<HTMLDivElement>;
  hasCursor?: boolean;
  mode: ViewMode;
  renderList?: () => React.ReactNode;
  renderGrid?: () => React.ReactNode;
}) {
  return (
    <div>
      {isPending && <div className="text-center py-10">Загрузка...</div>}
      {mode === 'list' && renderList && (
        <BoardsListLayoutList>{renderList?.()}</BoardsListLayoutList>
      )}
      {mode === 'cards' && renderGrid && (
        <BoardsListLayoutCards>{renderGrid?.()}</BoardsListLayoutCards>
      )}
      {!isPending && children}

      {isEmpty && !isPending && (
        <div className="text-center py-10">Доски не найдены</div>
      )}

      {hasCursor && (
        <div ref={cursorRef} className="text-center py-8">
          {isPendingNext &&
            {
              list: (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ),
              cards: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                </div>
              ),
            }[mode]}
        </div>
      )}
    </div>
  );
}

export function BoardsListLayoutCards({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
}

export function BoardsListLayoutList({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export function BoardsLayoutContentGroups({
  groups,
}: {
  groups: {
    title: string;
    items: React.ReactNode;
  }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {groups.map((group) => (
        <div key={group.title}>
          <div className="text-lg font-bold mb-2">{group.title}</div>
          {group.items}
        </div>
      ))}
    </div>
  );
}
