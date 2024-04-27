import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { RecordsPage, Props } from './RecordsPage';

const meta: Meta<Props> = {
    title: 'pages/record/RecordsPage',
    component: RecordsPage,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
