import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { RecordTriggersConsole, Props } from './RecordTriggersConsole';

const meta: Meta<Props> = {
    title: 'entities/record/RecordTriggersConsole',
    component: RecordTriggersConsole,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
