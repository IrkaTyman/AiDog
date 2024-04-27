import { TriggerDTO } from './TriggerDTO';

export type CommentDTO = {
    'id': string;
    'studentNickname': string;
    'message': string;
    'time': string;
    'triggers': TriggerDTO[];
};
