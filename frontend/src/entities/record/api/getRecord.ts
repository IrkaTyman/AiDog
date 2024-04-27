import { http } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { RecordViewDTO } from '../model/RecordViewDTO';

export function getRecord(id: string): Promise<RecordViewDTO[]> {
    return http.get(`record/${id}`).then(extractData);
}
