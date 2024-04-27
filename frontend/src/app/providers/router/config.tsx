import { RouteProps } from 'react-router-dom';

import { authRouteConfig } from '@pages/auth/routes';

export const routeConfig: RouteProps[] = [
    {
        path: '*',
        element: <p style={{ color: 'red' }}>Not found page</p>,
    },
    ...authRouteConfig,
];
