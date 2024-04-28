import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { RecordChatTimeline, Props } from './RecordChatTimeline';
import { TriggerType } from '../../model/TriggerType';

const meta: Meta<Props> = {
    title: 'entities/record/RecordChatTimeline',
    component: RecordChatTimeline,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        index: 0,
        setIndex: () => {},
        comments: [
            {
                id: 'c3f34f4b-a157-426a-80a0-39b7b64e6d4b',
                studentNickname: 'AhidovR',
                message: 'Привет, <Мат>сука</Мат>!',
                time: '09:51:55',
                triggers: [
                    {
                        id: '9bd2a4e0-ccd8-4354-9a67-f364605044d4',
                        trigger: {
                            id: 'e335ea7e-c816-4a88-b7b9-2ce7d5ead44e',
                            name: 'Мат',
                            description: 'Пользователи могут говорить не очень хорошие слова',
                            examples: "'Сука', 'Мразь'",
                            color: '#EC4747',
                            type: TriggerType.Bad,
                        },
                    },
                ],
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
                triggers: [
                    {
                        id: '9bd2a4e0-ccd8-4354-9a67-f364605044d4',
                        trigger: {
                            id: 'e335ea7e-c816-4a88-b7b9-2ce7d5ead44e',
                            name: 'Мат',
                            description: 'Пользователи могут говорить не очень хорошие слова',
                            examples: "'Сука', 'Мразь'",
                            color: '#EC4747',
                            type: TriggerType.Bad,
                        },
                    },
                ],
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
                triggers: [
                    {
                        id: '9bd2a4e0-ccd8-4354-9a67-f364605044d4',
                        trigger: {
                            id: 'e335ea7e-c816-4a88-b7b9-2ce7d5ead44e',
                            name: 'Мат',
                            description: 'Пользователи могут говорить не очень хорошие слова',
                            examples: "'Сука', 'Мразь'",
                            color: '#EC4747',
                            type: TriggerType.Bad,
                        },
                    },
                ],
            },
            {
                id: '2243f2f80-3285-4240-b3c0-b99fd850efe0',
                studentNickname: 'CatDev',
                message: 'Привет, всем!',
                time: '09:51:49',
                triggers: [
                    {
                        id: '9bd2a4e0-ccd8-4354-9a67-f364605044d4',
                        trigger: {
                            id: 'e335ea7e-c816-4a88-b7b9-2ce7d5ead44e',
                            name: 'Мат',
                            description: 'Пользователи могут говорить не очень хорошие слова',
                            examples: "'Сука', 'Мразь'",
                            color: '#EC4747',
                            type: TriggerType.Bad,
                        },
                    },
                ],
            },
        ],
    },
};
