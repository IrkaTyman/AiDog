import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { TriggersTable, Props } from './TriggersTable';

const meta: Meta<Props> = {
    title: 'entities/record/TriggersTable',
    component: TriggersTable,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
