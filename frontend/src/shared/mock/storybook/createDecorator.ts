import { Decorator } from '@storybook/react';
import * as H from 'history';

import { AxiosMockDecorator } from './AxiosMockDecorator';
import { ResetAxiosMockDecorator } from './ResetAxiosMockDecorator';
import { RouterDecorator } from './RouterDecorator';
import { AxiosMockOptions } from '../axios';

type WrapperOptions = Partial<{
    axiosMocks: AxiosMockOptions<unknown>[];
    route: string;
    routerEntries: H.LocationDescriptor[];
    additionalDecorators: Decorator[];
}>;

/**
 * Метод возвращает все необходимые декораторы storybook
 * @param axiosMocks моки axios
 * @param route текущий путь в роутере (default: '')
 * @param routerEntries текущая история роутера (default: [])
 * @param options
 */
export function createDecorators({
    axiosMocks = [],
    route = '',
    routerEntries = [''],
    additionalDecorators = [],
}: WrapperOptions): Decorator[] {
    return [
        RouterDecorator(route, routerEntries),
        ...(axiosMocks.map(data => AxiosMockDecorator(data))),
        ResetAxiosMockDecorator,
        ...additionalDecorators,
    ];
}
