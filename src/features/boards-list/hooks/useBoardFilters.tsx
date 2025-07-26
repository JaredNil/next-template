import { useState } from "react";

import type { BoardSortOptions } from "@/features/boards-list/model";

export type BoardsFilters = {
  search: string;
  sort: BoardSortOptions;
};

export function useBoardFilters() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<BoardSortOptions>("lastOpenedAt");

  return {
    search,
    setSearch,
    sort,
    setSort,
  };
}
