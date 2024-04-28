import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getRecord } from '../api/getRecord';
import { RecordDTO } from '../model/RecordDTO';

/**
 * Хук получения записи
 * @param id ID записи
 */
export function useGetRecord(
    id: string, options?: AxiosUseQueryOptions<RecordDTO, string[]>,
): UseQueryResult<RecordDTO, AxiosError> {
    return useQuery(
        ['record/get', id],
        () => getRecord(id),
        options,
    );
}
