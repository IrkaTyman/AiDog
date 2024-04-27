import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { RecordPage, Props } from './RecordPage';

const meta: Meta<Props> = {
    title: 'pages/record/RecordPage',
    component: RecordPage,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
