import { AxiosError } from 'axios/index';
import { UseMutationOptions } from 'react-query';

export type AxiosUseMutationOptions<TData, TArgs> = Omit<UseMutationOptions<TData, AxiosError, TArgs>, 'mutationFn'>;
