import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getTriggerTypes } from '../api/getTriggerTypes';
import { TriggerTypeDTO } from '../model/TriggerTypeDTO';

/**
 * Хук получения типов триггеров
 */
export function useGetTriggerTypes(
    options?: AxiosUseQueryOptions<TriggerTypeDTO[], string[]>,
): UseQueryResult<TriggerTypeDTO[], AxiosError> {
    return useQuery(
        ['triggers/get'],
        () => getTriggerTypes(),
        options,
    );
}
