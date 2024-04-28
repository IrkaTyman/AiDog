import { RecordDTO } from '@entities/record/model/RecordDTO';
import { RecordStatus } from '@entities/record/model/RecordStatus';
import { TriggerType } from '@entities/record/model/TriggerType';

import { HOST } from '@shared/config/axios/host';
import { AxiosMockOptions } from '@shared/mock/axios';

export function getGetRecordAxiosMock(id: string): AxiosMockOptions<RecordDTO>[] {
    return [
        {
            path: `${HOST}/record/${id}`,
            method: 'GET',
            reply: {
                statusOrCallback: 200,
                data: {
                    id: '5a83257e-fcb4-427e-aa77-05d0ff83ee6e',
                    name: 'Веб-разработчик: быстрый старт в профессии',
                    previewSrc: 'https://avatars.mds.yandex.net/i?id=9e5f51ae834d1034fba56cf6266d9dc8443e347f-10637298-images-thumbs&n=13',
                    status: RecordStatus.New,
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
                            triggers: [
                                {
                                    id: 'ca647302-1e1e-421d-a946-d63de2a53ded',
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
                            id: '85e585ad-a578-4f49-9e53-0ede958e0c3a',
                            studentNickname: 'Tuman',
                            message: '<Реклама>https://catdeveloper.ru/blog</Реклама>',
                            time: '09:52:32',
                            triggers: [
                                {
                                    id: '150d8736-3172-4b91-9d73-29e29a5ba804',
                                    trigger: {
                                        id: 'fa097bd5-9696-4412-8d24-0601ec4cbfaf',
                                        name: 'Реклама',
                                        description: 'Пользователи могут скидывать рекламные ссылки',
                                        examples: "'https://lk.hacks-ai.ru/1077374/hack подпишитесь на меня', 'https://www.youtube.com/'",
                                        color: '#F7A747',
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
                    ],
                    triggersCount: [
                        {
                            trigger: 'e335ea7e-c816-4a88-b7b9-2ce7d5ead44e',
                            count: '2',
                        },
                        {
                            trigger: 'fa097bd5-9696-4412-8d24-0601ec4cbfaf',
                            count: '1',
                        },
                    ],
                    results: [],
                    reports: [],
                },
            },
        },
    ];
}
