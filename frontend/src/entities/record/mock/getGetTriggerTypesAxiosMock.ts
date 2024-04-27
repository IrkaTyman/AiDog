import { TriggerType } from '@entities/record/model/TriggerType';
import { TriggerTypeDTO } from '@entities/record/model/TriggerTypeDTO';

import { HOST } from '@shared/config/axios/host';
import { AxiosMockOptions } from '@shared/mock/axios';

export function getGetTriggerTypesAxiosMock(): AxiosMockOptions<TriggerTypeDTO[]>[] {
    return [
        {
            path: `${HOST}/triggers`,
            method: 'GET',
            reply: {
                statusOrCallback: 200,
                data: [
                    {
                        id: 'd5a35974-3a99-4b95-a5ef-8c011dc18d96',
                        name: 'Тех. неполадки',
                        description: 'Пользователи могут сообщать или спрашивать о технических неполадках, произошедших на вебинаре',
                        examples: "'Где трансляция?', 'А препод придёт?'",
                        color: '#8D6CEA',
                        type: TriggerType.Bad,
                    },
                    {
                        id: 'e335ea7e-c816-4a88-b7b9-2ce7d5ead44e',
                        name: 'Мат',
                        description: 'Пользователи могут говорить не очень хорошие слова',
                        examples: "'Сука', 'Мразь'",
                        color: '#EC4747',
                        type: TriggerType.Bad,
                    },
                    {
                        id: 'fa097bd5-9696-4412-8d24-0601ec4cbfaf',
                        name: 'Реклама',
                        description: 'Пользователи могут скидывать рекламные ссылки',
                        examples: "'https://lk.hacks-ai.ru/1077374/hack подпишитесь на меня', 'https://www.youtube.com/'",
                        color: '#F7A747',
                        type: TriggerType.Bad,
                    },
                ],
            },
        },
    ];
}
