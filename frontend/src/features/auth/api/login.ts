import { LoginDTO } from '@features/auth/model/LoginDTO';

import { http } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { LoginModel } from '../model/LoginModel';

export function login(data: LoginModel): Promise<LoginDTO> {
    return http.post<LoginDTO>('auth/login', data).then(extractData);
};
