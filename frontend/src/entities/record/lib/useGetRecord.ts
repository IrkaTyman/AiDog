import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { getRecord } from '@entities/record/api/getRecord';
import { RecordDTO } from '@entities/record/model/RecordDTO';
import { RecordViewDTO } from '@entities/record/model/RecordViewDTO';

import { AxiosUseQueryOptions } from '@shared/types';

import { getRecords } from '../api/getRecords';
import { RecordStatus } from '../model/RecordStatus';
import { TriggerTypeDTO } from '../model/TriggerTypeDTO';

/**
 * хук для получения информации о компании
 * @param companyId id компании
 * @param options
 */
export function useGetRecord(
    id: string, options?: AxiosUseQueryOptions<RecordViewDTO[], string[]>,
): UseQueryResult<RecordViewDTO[], AxiosError> {
    return useQuery(
        ['record/get', id],
        () => getRecord(id),
        options,
    );
}
