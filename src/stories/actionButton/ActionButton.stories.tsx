import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlusIcon, TrashIcon, EditIcon } from 'lucide-react';
import { fn } from 'storybook/test';

import { ActionButton } from './ActionButton';

const meta = {
  title: 'Board/ActionButton',
  component: ActionButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <PlusIcon />,
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    children: <PlusIcon />,
    isActive: true,
  },
};

export const WithEditIcon: Story = {
  args: {
    children: <EditIcon />,
    isActive: false,
  },
};

export const WithTrashIcon: Story = {
  args: {
    children: <TrashIcon />,
    isActive: false,
  },
};

export const ActiveWithEditIcon: Story = {
  args: {
    children: <EditIcon />,
    isActive: true,
  },
};
