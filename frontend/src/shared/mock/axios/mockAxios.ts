import MockAdapter from 'axios-mock-adapter';
import {AxiosRequestConfig} from 'axios';

import {httpMock} from './httpMock';

type CallbackResponseSpecFunc = (
    config: AxiosRequestConfig,
) => any[] | Promise<any[]>;

interface AsymmetricMatcher {
    asymmetricMatch: Function;
}

interface RequestDataMatcher {
    [index: string]: any;
    params?: {
        [index: string]: any;
    };
}

interface HeadersMatcher {
    [header: string]: string;
}

export type AxiosMockOptions<T> = {
    method: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE',
    path: string;
    reply: {
        statusOrCallback: number | CallbackResponseSpecFunc,
        data?: T,
        headers?: any,
    }
    expectBody?: string | AsymmetricMatcher | RequestDataMatcher,
    expectHeaders?: HeadersMatcher | AsymmetricMatcher,
}

export function mockAxios<T>(options: AxiosMockOptions<T> | AxiosMockOptions<T>[]) {
    let parsedOptions: AxiosMockOptions<T>[] = [];
    if (!Array.isArray(options)) {
        parsedOptions[0] = options;
    } else {
        parsedOptions = options;
    }

    for(const options of parsedOptions) {
        const requestHandler = getRequestHandler(options);

        const {
            statusOrCallback,
            data,
            headers,
        } = options.reply;

        requestHandler!.reply(statusOrCallback, data, headers);
    }
}

function getRequestHandler<T>(
    options: Pick<AxiosMockOptions<T>, 'path'| 'method' | 'expectBody' | 'expectHeaders'>,
): MockAdapter.RequestHandler {
    switch (options.method) {
        case 'GET':
            return httpMock.onGet(options.path, options.expectBody, options.expectHeaders);
        case 'PUT':
            return httpMock.onPut(options.path, options.expectBody, options.expectHeaders);
        case 'POST':
            return httpMock.onPost(options.path, options.expectBody, options.expectHeaders);
        case 'PATCH':
            return httpMock.onPatch(options.path, options.expectBody, options.expectHeaders);
        case 'DELETE':
            return httpMock.onDelete(options.path, options.expectBody, options.expectHeaders);
        default:
            throw new Error(`unknown options.method: ${options.method}`);
    }
}
