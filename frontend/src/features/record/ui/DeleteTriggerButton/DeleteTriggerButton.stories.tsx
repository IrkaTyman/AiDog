import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { DeleteTriggerButton, Props } from './DeleteTriggerButton';

const meta: Meta<Props> = {
    title: 'features/record/DeleteTriggerButton',
    component: DeleteTriggerButton,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
