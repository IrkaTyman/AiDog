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

import { RecordsPage } from './RecordsPage';

describe('pages/record/RecordsPage', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        resetAxiosMock();
        restoreI18NextMock();
    });

    afterEach(() => {
        resetAxiosMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<RecordsPage />, { wrapper });

        const component = await screen.findByTestId('RecordsPage');
        expect(component).toBeInTheDocument();
    });
});
