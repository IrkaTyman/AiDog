import { screen, render } from '@testing-library/react';

import {
    createWrapper,
    mockAxios,
    resetAxiosMock,
} from '@shared/mock/axios';
import {
    mockI18Next,
    restoreI18NextMock,
} from '@shared/mock/i18n';

import { UserHeader } from './UserHeader';
import { getGetUserAxiosMock } from '../../mock/getGetUserAxiosMock';

describe('entities/user/UserHeader', () => {
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
        mockAxios(getGetUserAxiosMock());
    });

    afterEach(() => {
        resetAxiosMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<UserHeader />, { wrapper });

        const component = await screen.findByTestId('UserHeader');
        expect(component).toBeInTheDocument();
    });
});
