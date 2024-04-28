import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { UserHeader, Props } from './UserHeader';
import { getGetUserAxiosMock } from '../../mock/getGetUserAxiosMock';

const meta: Meta<Props> = {
    title: 'entities/user/UserHeader',
    component: UserHeader,
    decorators: createDecorators({
        axiosMocks: getGetUserAxiosMock(),
    }),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
