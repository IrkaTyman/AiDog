import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { RecordReportModal, Props } from './RecordReportModal';

const meta: Meta<Props> = {
    title: 'entities/record /RecordReportModal',
    component: RecordReportModal,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
