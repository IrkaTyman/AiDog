import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAuthContext } from '@app/providers/AuthProvider/AuthProvider';

import { routeConfig } from './config';

export const AppRouter = () => {
    const { isAuth } = useAuthContext();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {routeConfig(isAuth).map(route => (
                    <Route
                        {...route}
                        key={route.path}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};
