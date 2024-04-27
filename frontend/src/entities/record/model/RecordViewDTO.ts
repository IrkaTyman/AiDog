import { TriggerType } from '@entities/record/model/TriggerType';

import { RecordStatus } from './RecordStatus';

export type RecordViewDTO = {
    'id': string;
    'name': string;
    'previewSrc': string;
    'status': RecordStatus;
    'triggerTypes': {
        type: TriggerType;
        count: string;
    }[];
    commentsCount: number;
};
