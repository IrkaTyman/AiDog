import { screen, render } from '@testing-library/react';

import {
    createWrapper,
    resetAxiosMock,
} from '@shared/mock/axios';
import {
    mockI18Next,
    restoreI18NextMock,
} from '@shared/mock/i18n';

import { LoginForm } from './LoginForm';

describe('features/auth/LoginForm', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        resetAxiosMock();
        restoreI18NextMock();
    });

    beforeEach(() => {
        // mockAxios();
    });

    afterEach(() => {
        resetAxiosMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<LoginForm />, { wrapper });

        const component = await screen.findByTestId('LoginForm');
        expect(component).toBeInTheDocument();
    });
});
