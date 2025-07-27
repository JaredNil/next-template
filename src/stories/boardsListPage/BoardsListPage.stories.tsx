import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';

import { BoardsListPage } from './BoardsListPage';

const meta = {
  title: 'Pages/BoardsListPage',
  component: BoardsListPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof BoardsListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithBackground: Story = {
  args: {},
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};
