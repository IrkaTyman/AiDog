import {Decorator} from '@storybook/react';

import {resetAxiosMock} from '../axios/resetAxiosMock';

/**
 * Сбрасывает все моки с http
 * @param story стори, которую оборачиваем
 */
export const ResetAxiosMockDecorator: Decorator = story => {
    resetAxiosMock();

    return story();
};
