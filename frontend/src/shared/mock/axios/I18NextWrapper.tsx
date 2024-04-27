import { type Decorator } from '@storybook/react';
import React from 'react';
import { I18nextProvider } from 'react-i18next';

import { i18next } from '../i18n';

/**
 * Тестовая оболочка для работы i18next
 * @param component
 */
export const I18NextWrapper = (component: React.JSX.Element) => {
    return (
        <I18nextProvider i18n={i18next}>
            {component}
        </I18nextProvider>
    );
};
