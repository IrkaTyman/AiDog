import { AxiosError } from 'axios';
import { QueryKey, UseQueryOptions } from 'react-query';

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
