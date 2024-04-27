import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { createRecord } from '../api/createRecord';
import { CreateRecordModel } from '../model/CreateRecordModel';

export function useCreateRecord(options?: AxiosUseMutationOptions<void, CreateRecordModel>) {
    return useMutation(
        model => createRecord(model),
        options,
    );
}
