import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { ViewModeToggle } from './ViewModeToggle';

const meta = {
  title: 'Boards/ViewModeToggle',
  component: ViewModeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: ['list', 'cards'],
    },
    onChange: {
      action: 'changed',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof ViewModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'cards',
  },
};

export const ListMode: Story = {
  args: {
    value: 'list',
  },
};

export const CardsMode: Story = {
  args: {
    value: 'cards',
  },
};
