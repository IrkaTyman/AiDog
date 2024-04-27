import { CreateRecordCommentModel } from './CreateRecordCommentModel';

export type CreateRecordModel = {
    'name': string;
    'previewSrc': string;
    'comments': CreateRecordCommentModel[];
};
