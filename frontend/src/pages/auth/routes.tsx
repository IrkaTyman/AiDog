import { RouteProps } from 'react-router-dom';

import { LoginPage } from './LoginPage';

export const authRouteConfig: RouteProps[] = [
    {
        path: 'login',
        element: <LoginPage />,
    },
];
