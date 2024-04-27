import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { TriggersPage, Props } from './TriggersPage';

const meta: Meta<Props> = {
    title: 'pages/admin/TriggersPage',
    component: TriggersPage,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
