import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { LoginForm, Props } from './LoginForm';

const meta: Meta<Props> = {
    title: 'features/auth/LoginForm',
    component: LoginForm,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
