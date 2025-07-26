export type Board = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  lastOpenedAt: string;
  isFavorite: boolean;
};

export type BoardSortOptions =
  | 'createdAt'
  | 'updatedAt'
  | 'lastOpenedAt'
  | 'name';
