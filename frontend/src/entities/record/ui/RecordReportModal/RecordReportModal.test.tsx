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

import { RecordReportModal } from './RecordReportModal';

describe('entities/record /RecordReportModal', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<RecordReportModal />, { wrapper });

        const component = await screen.findByTestId('RecordReportModal');
        expect(component).toBeInTheDocument();
    });
});
