import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { createReport } from '../api/createReport';
import { CreateReportModel } from '../model/CreateReportModel';

export function useCreateReport(options?: AxiosUseMutationOptions<void, CreateReportModel>) {
    return useMutation(
        model => createReport(model),
        options,
    );
}
