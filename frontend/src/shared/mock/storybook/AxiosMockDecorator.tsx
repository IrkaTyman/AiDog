import {Decorator} from '@storybook/react';

import {AxiosMockOptions, mockAxios} from '../axios';

/**
 * Мокает запросы axios
 * @param options настройки мока
 */
export const AxiosMockDecorator: <T,>(options: AxiosMockOptions<T>) => Decorator = <T,>(options: AxiosMockOptions<T>) => {
    return (function AxiosMockDecorator(story) {
        mockAxios(options);

        return story();
    });
};
