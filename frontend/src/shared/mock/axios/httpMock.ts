import MockAdapter from 'axios-mock-adapter';

import { http } from '../../config/axios';

export const httpMock = new MockAdapter(http);
