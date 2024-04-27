import { AxiosError } from 'axios/index';
import { useMutation, UseMutationOptions } from 'react-query';

import { LoginDTO } from '@features/auth/model/LoginDTO';

import { login } from '../api/login';
import { LoginModel } from '../model/LoginModel';

export function useLogin(options?: Omit<UseMutationOptions<LoginDTO, AxiosError, LoginModel>, 'mutationFn'>) {
    return useMutation(
        model => login(model),
        options,
    );
}
