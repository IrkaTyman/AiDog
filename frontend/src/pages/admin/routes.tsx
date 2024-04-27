import { RouteProps } from 'react-router-dom';

import { TriggersPage } from '@pages/admin/TriggersPage';

export const adminRouteConfig: RouteProps[] = [
    {
        path: 'admin/triggers',
        element: <TriggersPage />,
    },
];
