import { UserDTO } from '@entities/user/model/UserDTO';

import { AxiosMockOptions } from '@shared/mock/axios';

export function getGetUserAxiosMock(): AxiosMockOptions<UserDTO>[] {
    return [
        {
            path: '/user/profile',
            method: 'GET',
            reply: {
                statusOrCallback: 200,
                data: {
                    id: '1e3ea3a7-b425-499d-91bc-bce155a04790',
                    email: 'admin@mail.ru',
                    firstName: 'Максим',
                    secondName: 'Рожков',
                    avatarSrc: 'https://catdeveloper.ru/static/media/Avatar3.92985f5830dcd0843c15.png',
                },
            },
        },
    ];
}
