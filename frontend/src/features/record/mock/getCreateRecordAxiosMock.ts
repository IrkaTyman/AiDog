import { HOST } from '@shared/config/axios/host';
import { AxiosMockOptions } from '@shared/mock/axios';

export function getCreateRecordAxiosMock(): AxiosMockOptions<void>[] {
    return [
        {
            path: `${HOST}/record`,
            method: 'POST',
            reply: {
                statusOrCallback: 200,
            },
        },
    ];
}
