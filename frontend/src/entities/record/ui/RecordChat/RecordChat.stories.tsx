import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TriggerType } from '@entities/record/model/TriggerType';

import { createDecorators } from '@shared/mock/storybook';

import { RecordChat, Props } from './RecordChat';

const meta: Meta<Props> = {
    title: 'entities/record/RecordChat',
    component: RecordChat,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        comments: [
            {
                id: 'c3f34f4b-a157-426a-80a0-39b7b64e6d4b',
                studentNickname: 'AhidovR',
                message: 'Привет, <Мат>сука</Мат>!',
                time: '09:51:55',
                triggers: [],
            },
            {
                id: 'eaa99416-1dc6-495d-9477-2fcac690188d',
                studentNickname: 'CatDev',
                message: 'Привет, <Мат>сука</Мат>!',
                time: '09:53:31',
                triggers: [],
            },
            {
                id: '85e585ad-a578-4f49-9e53-0ede958e0c3a',
                studentNickname: 'Tuman',
                message: '<Реклама>https://catdeveloper.ru/blog</Реклама>',
                time: '09:52:32',
                triggers: [],
            },
            {
                id: '243f2f80-3285-4240-b3c0-b99fd850efe0',
                studentNickname: 'CatDev',
                message: 'Привет, всем!',
                time: '09:51:49',
                triggers: [],
            },
            {
                id: '2c3f34f4b-a157-426a-80a0-39b7b64e6d4b',
                studentNickname: 'AhidovR',
                message: 'Привет, <Мат>сука</Мат>!',
                time: '09:51:55',
                triggers: [],
            },
            {
                id: '2eaa99416-1dc6-495d-9477-2fcac690188d',
                studentNickname: 'CatDev',
                message: 'Привет, <Мат>сука</Мат>!',
                time: '09:53:31',
                triggers: [],
            },
            {
                id: '285e585ad-a578-4f49-9e53-0ede958e0c3a',
                studentNickname: 'Tuman',
                message: '<Реклама>https://catdeveloper.ru/blog</Реклама>',
                time: '09:52:32',
                triggers: [],
            },
            {
                id: '2243f2f80-3285-4240-b3c0-b99fd850efe0',
                studentNickname: 'CatDev',
                message: 'Привет, всем!',
                time: '09:51:49',
                triggers: [],
            },
            {
                id: '3c3f34f4b-a157-426a-80a0-39b7b64e6d4b',
                studentNickname: 'AhidovR',
                message: 'Привет, <Мат>сука</Мат>!',
                time: '09:51:55',
                triggers: [],
            },
            {
                id: '3eaa99416-1dc6-495d-9477-2fcac690188d',
                studentNickname: 'CatDev',
                message: 'Привет, <Мат>сука</Мат>!',
                time: '09:53:31',
                triggers: [],
            },
            {
                id: '385e585ad-a578-4f49-9e53-0ede958e0c3a',
                studentNickname: 'Tuman',
                message: '<Реклама>https://catdeveloper.ru/blog</Реклама>',
                time: '09:52:32',
                triggers: [],
            },
            {
                id: '3243f2f80-3285-4240-b3c0-b99fd850efe0',
                studentNickname: 'CatDev',
                message: 'Пока!',
                time: '09:51:49',
                triggers: [],
            },
            {
                id: '4c3f34f4b-a157-426a-80a0-39b7b64e6d4b',
                studentNickname: 'AhidovR',
                message: 'Привет, <Мат>сука</Мат>!',
                time: '09:51:55',
                triggers: [],
            },
            {
                id: '4eaa99416-1dc6-495d-9477-2fcac690188d',
                studentNickname: 'CatDev',
                message: 'Привет, <Мат>сука</Мат>!',
                time: '09:53:31',
                triggers: [],
            },
            {
                id: '485e585ad-a578-4f49-9e53-0ede958e0c3a',
                studentNickname: 'Tuman',
                message: '<Реклама>https://catdeveloper.ru/blog</Реклама>',
                time: '09:52:32',
                triggers: [],
            },
            {
                id: '4243f2f80-3285-4240-b3c0-b99fd850efe0',
                studentNickname: 'CatDev',
                message: 'Привет, всем!',
                time: '09:51:49',
                triggers: [],
            },
        ],
    },

    render: props => {
        const [id, setId] = useState<string | undefined>();

        setTimeout(() => { setId('3243f2f80-3285-4240-b3c0-b99fd850efe0'); }, 2000);

        return <RecordChat {...props} currentCommentId={id} />;
    },
};
