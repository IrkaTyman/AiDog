import { RecordStatus } from '@entities/record/model/RecordStatus';
import { RecordViewDTO } from '@entities/record/model/RecordViewDTO';
import { TriggerType } from '@entities/record/model/TriggerType';

import { HOST } from '@shared/config/axios/host';
import { AxiosMockOptions } from '@shared/mock/axios';

export function getGetRecordsAxiosMock(): AxiosMockOptions<RecordViewDTO[]>[] {
    return [
        {
            path: `${HOST}/record/get-all`,
            method: 'GET',
            reply: {
                statusOrCallback: 200,
                data: [
                    {
                        id: '5a83257e-fcb4-427e-aa77-05d0ff83ee6e',
                        name: 'Веб-разработчик: быстрый старт в профессии',
                        previewSrc: 'https://avatars.mds.yandex.net/i?id=9e5f51ae834d1034fba56cf6266d9dc8443e347f-10637298-images-thumbs&n=13',
                        status: RecordStatus.New,
                        triggerTypes: [
                            {
                                type: TriggerType.Bad,
                                count: '3',
                            },
                        ],
                        commentsCount: 10
                    },
                    {
                        id: '8f0493de-b1cd-4d57-b56f-4ac79c47dbf5',
                        name: '123',
                        previewSrc: 'https://www.uuidgenerator.net/version4',
                        status: RecordStatus.New,
                        triggerTypes: [
                            {
                                type: TriggerType.Good,
                                count: '1',
                            },
                            {
                                type: TriggerType.Bad,
                                count: '3',
                            },
                        ],
                        commentsCount: 1
                    },
                ],
            },
        },
    ];
}
