import { Meta, StoryObj } from '@storybook/react';
import { Button } from 'antd';

import { createDecorators } from '@shared/mock/storybook';

import { CreateRecordModal, Props } from './CreateRecordModal';

const meta: Meta<Props> = {
    title: 'features/record/CreateRecordModal',
    component: CreateRecordModal,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        triggerComponent: open => <Button onClick={open}>Click</Button>,
    },
};
