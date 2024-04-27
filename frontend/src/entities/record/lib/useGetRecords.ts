import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { RecordDTO } from '@entities/record/model/RecordDTO';
import { RecordViewDTO } from '@entities/record/model/RecordViewDTO';

import { AxiosUseQueryOptions } from '@shared/types';

import { getRecords } from '../api/getRecords';
import { RecordStatus } from '../model/RecordStatus';
import { TriggerTypeDTO } from '../model/TriggerTypeDTO';

type Arguments = {
    status: RecordStatus;
    triggers: TriggerTypeDTO['id'][];
};

/**
 * хук для получения информации о компании
 * @param companyId id компании
 * @param options
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
