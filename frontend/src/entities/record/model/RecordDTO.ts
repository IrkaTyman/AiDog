import { CommentDTO } from './CommentDTO';
import { RecordStatus } from './RecordStatus';

export type RecordDTO = {
    'id': string;
    'name': string;
    'previewSrc': string;
    'status': RecordStatus;
    'comments': CommentDTO[];
    'triggersCount':
        {
            'trigger': string;
            'count': string;
        }[];
};
