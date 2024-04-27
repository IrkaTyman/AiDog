import { RecordDTO } from '@entities/record/model/RecordDTO';

import { http } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getRecord(id: string): Promise<RecordDTO> {
    return http.get(`record/${id}`).then(extractData);
}
