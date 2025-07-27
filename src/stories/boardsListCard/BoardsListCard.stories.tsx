import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import { HeartIcon, TrashIcon } from 'lucide-react';

import { BoardsListCard } from './BoardsListCard';
import { Button } from '../../shared/ui/kit/button';

const meta = {
  title: 'Boards/BoardsListCard',
  component: BoardsListCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof BoardsListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockBoard = {
  id: '1',
  name: 'Моя доска',
  createdAt: '2024-01-15T10:00:00Z',
  lastOpenedAt: '2024-01-20T14:30:00Z',
};

export const Default: Story = {
  args: {
    board: mockBoard,
  },
};

export const WithFavoriteAction: Story = {
  args: {
    board: mockBoard,
    rightTopActions: (
      <Button variant="ghost" size="icon">
        <HeartIcon className="h-4 w-4" />
      </Button>
    ),
  },
};

export const WithBottomActions: Story = {
  args: {
    board: mockBoard,
    bottomActions: (
      <Button variant="destructive" size="sm">
        <TrashIcon className="h-4 w-4 mr-2" />
        Удалить
      </Button>
    ),
  },
};

export const WithBothActions: Story = {
  args: {
    board: mockBoard,
    rightTopActions: (
      <Button variant="ghost" size="icon">
        <HeartIcon className="h-4 w-4" />
      </Button>
    ),
    bottomActions: (
      <Button variant="destructive" size="sm">
        <TrashIcon className="h-4 w-4 mr-2" />
        Удалить
      </Button>
    ),
  },
};

export const LongName: Story = {
  args: {
    board: {
      ...mockBoard,
      name: 'Очень длинное название доски которое может не поместиться в одну строку и будет переноситься',
    },
  },
};
