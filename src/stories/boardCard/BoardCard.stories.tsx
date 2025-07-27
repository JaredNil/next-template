import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';

import { BoardCard } from './BoardCard';
import type { ApiSchemas } from '../../shared/openapi/schema';

const meta = {
  title: 'Boards/BoardCard',
  component: BoardCard,
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
} satisfies Meta<typeof BoardCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockBoard: ApiSchemas['Board'] = {
  id: '1',
  name: 'Моя доска',
  createdAt: '2024-01-15T10:00:00Z',
  lastOpenedAt: '2024-01-20T14:30:00Z',
  updatedAt: '2024-01-20T14:30:00Z',
  isFavorite: false,
};

export const Default: Story = {
  args: {
    board: mockBoard,
  },
};

export const LongName: Story = {
  args: {
    board: {
      ...mockBoard,
      name: 'Очень длинное название доски которое может не поместиться в одну строку',
    },
  },
};

export const RecentBoard: Story = {
  args: {
    board: {
      ...mockBoard,
      lastOpenedAt: new Date().toISOString(),
    },
  },
};

export const OldBoard: Story = {
  args: {
    board: {
      ...mockBoard,
      createdAt: '2023-01-15T10:00:00Z',
      lastOpenedAt: '2023-06-20T14:30:00Z',
    },
  },
};
