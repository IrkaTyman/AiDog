import { TriggerType } from '../model/TriggerType';

export type TriggerTypeDTO = {
    'id': string;
    'name': string;
    'description': string;
    'examples': string;
    'color': string;
    'type': TriggerType;
};
