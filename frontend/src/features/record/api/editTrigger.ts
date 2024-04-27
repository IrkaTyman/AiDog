import { TriggerTypeDTO } from '@entities/record/model/TriggerTypeDTO';

import { http } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function editTrigger(data: Partial<TriggerTypeDTO>): Promise<void> {
    return http.patch<void>(`trigger/${data.id}`, data).then(extractData);
};
