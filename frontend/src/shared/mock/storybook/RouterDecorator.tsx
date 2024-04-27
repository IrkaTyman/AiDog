import {type Decorator} from '@storybook/react';
import React from 'react';
import * as H from 'history';
import { RouterWrapper } from '../axios/RouterWrapper';

/**
 * Storybook-декоратор для работы React-Router
 * @param routePath
 * @param initialEntries
 */
export const RouterDecorator: (routePath: string, initialEntries?: H.LocationDescriptor[]) => Decorator =
    (routePath, initialEntries) => {
        return (function MemoryRouterWrapper(Story) {
            return RouterWrapper(routePath,initialEntries)(<Story/>)
        });
    };
