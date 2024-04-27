import { RouteProps, Navigate } from 'react-router-dom';

import { authRouteConfig } from '@pages/auth/routes';
import { recordRouteConfig } from '@pages/records/routes';

export const routeConfig = (isAuth: boolean): RouteProps[] => {
    let routes: RouteProps[] = [];

    if (isAuth) {
        routes = routes.concat([
            ...recordRouteConfig,
            {
                path: '*',
                element: <Navigate to={'/record'} />,
            },
        ]);
    } else {
        routes = routes.concat([
            ...authRouteConfig,
            {
                path: '*',
                element: <Navigate to={'/login'} />,
            },
        ]);
    }
    console.log(routes);

    return routes;
};
