import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { CreateReportModal, Props } from './CreateReportModal';

const meta: Meta<Props> = {
    title: 'features/record/CreateReportModal',
    component: CreateReportModal,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
