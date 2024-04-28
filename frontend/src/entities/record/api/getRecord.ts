import { http } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { RecordDTO } from '../model/RecordDTO';

/**
 * Метод получения записи
 * @param id ID записи
 */
export function getRecord(id: string): Promise<RecordDTO> {
    return http.get(`record/${id}`).then(extractData);
}
