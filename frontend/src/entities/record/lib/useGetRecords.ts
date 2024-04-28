import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getRecords } from '../api/getRecords';
import { RecordStatus } from '../model/RecordStatus';
import { RecordViewDTO } from '../model/RecordViewDTO';
import { TriggerTypeDTO } from '../model/TriggerTypeDTO';

type Arguments = {
    status: RecordStatus;
    triggers: TriggerTypeDTO['id'][];
};

/**
 * Хук получения записей
 * @param status Статус записи
 * @param triggersIds Триггеры записи
 */
export function useGetRecords(
    args: Arguments, options?: AxiosUseQueryOptions<RecordViewDTO[], string[]>,
): UseQueryResult<RecordViewDTO[], AxiosError> {
    return useQuery(
        ['records/get-all', args.status, args.triggers],
        () => getRecords(args.status, args.triggers),
        options,
    );
}
