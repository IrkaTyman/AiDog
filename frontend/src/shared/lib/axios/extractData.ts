import {AxiosResponse} from 'axios';

export function extractData<T>(response: AxiosResponse<T>): T {
    return response.data;
}
