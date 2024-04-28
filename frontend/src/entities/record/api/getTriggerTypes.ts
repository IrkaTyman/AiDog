import { http } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { TriggerTypeDTO } from '../model/TriggerTypeDTO';

/**
 * Метод получения типов триггеров
 */
export function getTriggerTypes(): Promise<TriggerTypeDTO[]> {
    return http.get<TriggerTypeDTO[]>('trigger').then(extractData);
}
