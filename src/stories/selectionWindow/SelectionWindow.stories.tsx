import type { Meta, StoryObj } from '@storybook/react-vite';

import { SelectionWindow } from './SelectionWindow';
import type { Rect } from '../../features/board/model/rect';

const meta = {
  title: 'Board/SelectionWindow',
  component: SelectionWindow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    x: {
      control: 'number',
    },
    y: {
      control: 'number',
    },
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
  },
} satisfies Meta<typeof SelectionWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    x: 50,
    y: 50,
    width: 200,
    height: 150,
  } as Rect,
  decorators: [
    (Story) => (
      <div className="w-96 h-64 border border-gray-300 relative bg-gray-50">
        <Story />
      </div>
    ),
  ],
};

export const Small: Story = {
  args: {
    x: 100,
    y: 100,
    width: 80,
    height: 60,
  } as Rect,
  decorators: [
    (Story) => (
      <div className="w-96 h-64 border border-gray-300 relative bg-gray-50">
        <Story />
      </div>
    ),
  ],
};

export const Large: Story = {
  args: {
    x: 20,
    y: 20,
    width: 300,
    height: 200,
  } as Rect,
  decorators: [
    (Story) => (
      <div className="w-96 h-64 border border-gray-300 relative bg-gray-50">
        <Story />
      </div>
    ),
  ],
};

export const TopLeft: Story = {
  args: {
    x: 0,
    y: 0,
    width: 150,
    height: 100,
  } as Rect,
  decorators: [
    (Story) => (
      <div className="w-96 h-64 border border-gray-300 relative bg-gray-50">
        <Story />
      </div>
    ),
  ],
};
