import type { Meta, StoryObj } from '@storybook/react-vite';

import { Dots } from './Dots';
import type { WindowPosition } from '../../features/board/model/windowPosition';

const meta = {
  title: 'Board/Dots',
  component: Dots,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    windowPosition: {
      control: 'object',
    },
  },
} satisfies Meta<typeof Dots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    windowPosition: {
      x: 0,
      y: 0,
      zoom: 1,
    } as WindowPosition,
  },
  decorators: [
    (Story) => (
      <div className="w-96 h-64 border border-gray-300 relative">
        <Story />
      </div>
    ),
  ],
};

export const ZoomedIn: Story = {
  args: {
    windowPosition: {
      x: 0,
      y: 0,
      zoom: 2,
    } as WindowPosition,
  },
  decorators: [
    (Story) => (
      <div className="w-96 h-64 border border-gray-300 relative">
        <Story />
      </div>
    ),
  ],
};

export const ZoomedOut: Story = {
  args: {
    windowPosition: {
      x: 0,
      y: 0,
      zoom: 0.5,
    } as WindowPosition,
  },
  decorators: [
    (Story) => (
      <div className="w-96 h-64 border border-gray-300 relative">
        <Story />
      </div>
    ),
  ],
};

export const Moved: Story = {
  args: {
    windowPosition: {
      x: 100,
      y: 50,
      zoom: 1,
    } as WindowPosition,
  },
  decorators: [
    (Story) => (
      <div className="w-96 h-64 border border-gray-300 relative">
        <Story />
      </div>
    ),
  ],
};
