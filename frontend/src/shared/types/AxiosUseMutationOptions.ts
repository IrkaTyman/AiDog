import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios/index';

export type AxiosUseMutationOptions<TData, TArgs> = Omit<UseMutationOptions<TData, AxiosError, TArgs>, 'mutationFn'>;
