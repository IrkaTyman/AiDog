import { screen, render } from '@testing-library/react';

import { getGetRecordsAxiosMock } from '@entities/record/mock/getGetRecordsAxiosMock';
import { getGetTriggerTypesAxiosMock } from '@entities/record/mock/getGetTriggerTypesAxiosMock';

import {
    createWrapper,
    mockAxios,
    resetAxiosMock,
} from '@shared/mock/axios';
import {
    mockI18Next,
    restoreI18NextMock,
} from '@shared/mock/i18n';

import { RecordsGrid } from './RecordsGrid';

describe('entities/record/RecordsGrid', () => {
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
        mockAxios<any>([
            ...getGetTriggerTypesAxiosMock(),
            ...getGetRecordsAxiosMock(),
        ]);
    });

    afterEach(() => {
        resetAxiosMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<RecordsGrid />, { wrapper });

        const component = await screen.findByTestId('RecordsGrid');
        expect(component).toBeInTheDocument();
    });
});
