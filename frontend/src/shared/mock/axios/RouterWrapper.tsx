import * as H from 'history';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

/**
 * Тестовая оболочка для работы React-Router
 * @param routePath
 * @param initialEntries
 */
export const RouterWrapper = (routePath: string, initialEntries?: H.LocationDescriptor[]) => {
    return function MemoryRouterWrapper(component: JSX.Element) {
        return (
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>
                    <Route path={routePath} element={component} />
                </Routes>
            </MemoryRouter>
        );
    };
};
