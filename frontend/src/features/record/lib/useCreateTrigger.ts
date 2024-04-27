import { useMutation } from 'react-query';

import { createTrigger } from '@features/record/api/createTrigger';
import { CreateTriggerModel } from '@features/record/model/CreateTriggerModel';

import { AxiosUseMutationOptions } from '@shared/types';

export function useCreateTrigger(options?: AxiosUseMutationOptions<void, CreateTriggerModel>) {
    return useMutation(
        model => createTrigger(model),
        options,
    );
}
