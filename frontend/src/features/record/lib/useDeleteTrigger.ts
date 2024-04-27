import { useMutation } from 'react-query';

import { deleteTrigger } from '@features/record/api/deleteTrigger';
import { editTrigger } from '@features/record/api/editTrigger';

import { TriggerTypeDTO } from '@entities/record/model/TriggerTypeDTO';

import { AxiosUseMutationOptions } from '@shared/types';

export function useDeleteTrigger(options?: AxiosUseMutationOptions<void, string>) {
    return useMutation(
        id => deleteTrigger(id),
        options,
    );
}
