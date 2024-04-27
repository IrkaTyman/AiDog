import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { CreateTriggerModal, Props } from './CreateTriggerModal';

const meta: Meta<Props> = {
    title: 'features/record/CreateTriggerModal',
    component: CreateTriggerModal,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
