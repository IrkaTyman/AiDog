import { AxiosError } from 'axios';
import { useQuery, UseQueryResult, UseQueryOptions } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getUser } from '../api/getUser';
import { UserDTO } from '../model/UserDTO';

/**
 * хук для получения информации о компании
 * @param companyId id компании
 * @param options
 */
export function useGetUser(options?: AxiosUseQueryOptions<UserDTO, string[]>): UseQueryResult<UserDTO, AxiosError> {
    return useQuery(
        ['user/get-profile'],
        getUser,
        options,
    );
}
