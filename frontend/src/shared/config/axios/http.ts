import axios from 'axios';

import { HOST } from './host';

export const http = axios.create({
    baseURL: HOST,
});

http.interceptors.request.use(async config => {
    // Не локализуем метод запроса на доступные языки
    if (config.method === 'GET') {
        return config;
    }

    // eslint-disable-next-line no-param-reassign
    config.params = config.params ?? {};

    const token = localStorage.getItem('token');
    // eslint-disable-next-line no-param-reassign
    config.headers['Access-Token'] = `Bearer ${token}`;

    return config;
});
