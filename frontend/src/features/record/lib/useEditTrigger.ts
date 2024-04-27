import { useMutation } from 'react-query';

import { editTrigger } from '@features/record/api/editTrigger';

import { TriggerTypeDTO } from '@entities/record/model/TriggerTypeDTO';

import { AxiosUseMutationOptions } from '@shared/types';

export function useEditTrigger(options?: AxiosUseMutationOptions<void, Partial<TriggerTypeDTO>>) {
    return useMutation(
        model => editTrigger(model),
        options,
    );
}
