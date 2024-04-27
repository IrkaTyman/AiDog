import { RouteProps } from 'react-router-dom';

import { RecordPage } from '@pages/records/RecordPage';
import { RecordsPage } from '@pages/records/RecordsPage';

export const recordRouteConfig: RouteProps[] = [
    {
        path: 'record/:id',
        element: <RecordPage />,
    },
    {
        path: 'record',
        element: <RecordsPage />,
    },
];
