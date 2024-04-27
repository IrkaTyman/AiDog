import { http } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function deleteTrigger(id: string): Promise<void> {
    console.log('deleteawd');
    return http.delete<void>(`trigger/${id}`).then(extractData);
};
