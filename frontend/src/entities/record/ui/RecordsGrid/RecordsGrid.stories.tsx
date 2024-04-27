import { Meta, StoryObj } from '@storybook/react';

import { getGetRecordsAxiosMock } from '@entities/record/mock/getGetRecordsAxiosMock';
import { getGetTriggerTypesAxiosMock } from '@entities/record/mock/getGetTriggerTypesAxiosMock';

import { createDecorators } from '@shared/mock/storybook';

import { RecordsGrid, Props } from './RecordsGrid';

const meta: Meta<Props> = {
    title: 'entities/record/RecordsGrid',
    component: RecordsGrid,
    decorators: createDecorators({
        axiosMocks: [
            ...getGetTriggerTypesAxiosMock(),
            ...getGetRecordsAxiosMock(),
        ],
    }),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
