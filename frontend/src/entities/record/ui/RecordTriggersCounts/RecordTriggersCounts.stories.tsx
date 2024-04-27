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
    args: {
        triggersCount: [
            {
                trigger: 'e335ea7e-c816-4a88-b7b9-2ce7d5ead44e',
                count: '2',
            },
            {
                trigger: 'fa097bd5-9696-4412-8d24-0601ec4cbfaf',
                count: '1',
            },
        ],
    },
};
