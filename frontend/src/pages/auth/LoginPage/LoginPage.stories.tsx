import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { LoginPage, Props } from './LoginPage';

const meta: Meta<Props> = {
    title: 'pages/auth/LoginPage',
    component: LoginPage,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
