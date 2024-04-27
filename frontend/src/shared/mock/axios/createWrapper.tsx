import React from 'react';
import * as H from 'history';

import {I18NextWrapper} from './I18NextWrapper';
import {RouterWrapper} from './RouterWrapper';
import {QueryWrapper} from './QueryWrapper';
import {SuspenseWrapper} from './SuspenseWrapper';

type WrapperOptions = Partial<{
    route: string,
    routerEntries: H.LocationDescriptor[],
    additionalWrappers: ((component: React.JSX.Element) => React.JSX.Element)[],
}>

export function createWrapper({
    route = '/',
    routerEntries = ['/'],
    additionalWrappers = [],
}: WrapperOptions): React.JSXElementConstructor<{children: React.ReactElement}> {
    return ({children}) => {
        const wrappers = [
            SuspenseWrapper,
            QueryWrapper,
            I18NextWrapper,
            RouterWrapper(route, routerEntries),
            ...additionalWrappers,
        ];

        let component = children;
        for (const wrapper of wrappers) {
            component = wrapper(component);
        }
        return component;
    };
}
