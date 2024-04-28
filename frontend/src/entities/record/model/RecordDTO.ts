import { CommentDTO } from './CommentDTO';
import { RecordStatus } from './RecordStatus';
import { RecordTriggerCountDTO } from './RecordTriggerCountDTO';
import { ReportDTO } from './ReportDTO';
import { ResultDTO } from './ResultDTO';

export type RecordDTO = {
    'id': string;
    'name': string;
    'previewSrc': string;
    'status': RecordStatus;
    'comments': CommentDTO[];
    'triggersCount': RecordTriggerCountDTO[];
    reports: ReportDTO[];
    results: ResultDTO[];
};
