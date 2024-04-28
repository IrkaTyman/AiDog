import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { RecordConclusions, Props } from './RecordConclusions';

const meta: Meta<Props> = {
    title: 'entities/record/RecordConclusions',
    component: RecordConclusions,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
