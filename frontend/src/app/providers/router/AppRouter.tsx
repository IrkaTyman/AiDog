import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routeConfig } from './config';

export const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {routeConfig.map(route => (
                    <Route
                        {...route}
                        key={route.path}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};
