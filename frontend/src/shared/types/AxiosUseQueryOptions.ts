import {QueryKey, UseQueryOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export type AxiosUseQueryOptions<
    TResponse,
    TQueryKey extends QueryKey = QueryKey
> = Omit<
    UseQueryOptions<
        TResponse,
        AxiosError,
        TResponse,
        TQueryKey
    >,
    'queryKey' | 'queryFn'
>;
