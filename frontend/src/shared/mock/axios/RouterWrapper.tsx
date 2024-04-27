import React from 'react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import * as H from 'history';

/**
 * Тестовая оболочка для работы React-Router
 * @param routePath
 * @param initialEntries
 */
export const RouterWrapper = (routePath: string, initialEntries?: H.LocationDescriptor[]) => {
        return (function MemoryRouterWrapper(component: JSX.Element) {
            return (
                <MemoryRouter initialEntries={initialEntries}>
                    <Routes>
                        <Route path={routePath}>
                            {component}
                        </Route>
                    </Routes>
                </MemoryRouter>
            );
        });
    };
