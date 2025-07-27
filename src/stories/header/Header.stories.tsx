import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';

import { AppHeader } from './Header';

const meta = {
  title: 'App/Header',
  component: AppHeader,
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
} satisfies Meta<typeof AppHeader>;

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
        <div className="min-h-screen bg-gray-100">
          <Story />
          <div className="p-8">
            <h1>Page Content</h1>
            <p>This is the main content area below the header.</p>
          </div>
        </div>
      </BrowserRouter>
    ),
  ],
};
