import { RouteProps } from 'react-router-dom';

import { RecordsPage } from '@pages/records/RecordsPage';

export const recordRouteConfig: RouteProps[] = [
    {
        path: 'record',
        element: <RecordsPage />,
    },
];
