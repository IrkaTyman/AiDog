import { http } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { CreateReportModel } from '../model/CreateReportModel';

export function createReport(data: CreateReportModel): Promise<void> {
    return http.post<void>('report', data).then(extractData);
};
