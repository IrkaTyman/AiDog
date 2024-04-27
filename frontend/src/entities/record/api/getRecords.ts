import {http} from '@shared/config/axios';
import {extractData} from '@shared/lib';

import {RecordStatus} from '../model/RecordStatus';
import {RecordViewDTO} from '../model/RecordViewDTO';
import {TriggerTypeDTO} from '../model/TriggerTypeDTO';

export function getRecords(
    status: RecordStatus,
    triggersIds: TriggerTypeDTO['id'][],
): Promise<RecordViewDTO[]> {
    const filters: {status?: RecordStatus; triggers?: string[]} = {};

    if (status && status !== RecordStatus.All) {
        filters.status = status;
    }
    if (triggersIds.length > 0) {
        filters.triggers = triggersIds;
    }
    return http.post<RecordViewDTO[]>('record/get-all', filters).then(extractData);
}
