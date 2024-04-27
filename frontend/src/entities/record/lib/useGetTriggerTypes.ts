import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { getTriggerTypes } from '@entities/record/api/getTriggerTypes';
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
export function useGetTriggerTypes(
    options?: AxiosUseQueryOptions<TriggerTypeDTO[], string[]>,
): UseQueryResult<TriggerTypeDTO[], AxiosError> {
    return useQuery(
        ['triggers/get'],
        () => getTriggerTypes(),
        options,
    );
}
