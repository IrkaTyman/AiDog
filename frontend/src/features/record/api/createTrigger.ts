import { http } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { CreateTriggerModel } from '../model/CreateTriggerModel';

export function createTrigger(data: CreateTriggerModel): Promise<void> {
    return http.post<void>('trigger', data).then(extractData);
};
