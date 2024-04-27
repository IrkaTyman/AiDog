import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { RecordTriggersCounts, Props } from './RecordTriggersCounts';

const meta: Meta<Props> = {
    title: 'entities/record/RecordTriggersCounts',
    component: RecordTriggersCounts,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
