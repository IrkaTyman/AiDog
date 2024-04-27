import { Meta, StoryObj } from '@storybook/react';

import { TriggerType } from '@entities/record/model/TriggerType';

import { createDecorators } from '@shared/mock/storybook';

import { EditTriggerModal, Props } from './EditTriggerModal';

const meta: Meta<Props> = {
    title: 'features/record/EditTriggerModal',
    component: EditTriggerModal,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        trigger: {
            id: '',
            name: '',
            description: '',
            color: '',
            type: TriggerType.Good,
            examples: '',
        },
    },
};
