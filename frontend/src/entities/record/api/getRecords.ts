import { http } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { RecordStatus } from '../model/RecordStatus';
import { RecordViewDTO } from '../model/RecordViewDTO';
import { TriggerTypeDTO } from '../model/TriggerTypeDTO';

export function getRecords(
    status: RecordStatus,
    triggersIds: TriggerTypeDTO['id'][],
): Promise<RecordViewDTO[]> {
    return http.post<RecordViewDTO[]>('record/get-all', { status, triggers: triggersIds }).then(extractData);
}
