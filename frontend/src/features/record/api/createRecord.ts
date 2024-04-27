import { http } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { CreateRecordModel } from '../model/CreateRecordModel';

export function createRecord(data: CreateRecordModel): Promise<void> {
    return http.post<void>('record', data).then(extractData);
};
