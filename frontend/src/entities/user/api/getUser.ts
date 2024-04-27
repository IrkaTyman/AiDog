import { http } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { UserDTO } from '../model/UserDTO';

export function getUser(): Promise<UserDTO> {
    return http.get<UserDTO>('user/profile').then(extractData);
}
