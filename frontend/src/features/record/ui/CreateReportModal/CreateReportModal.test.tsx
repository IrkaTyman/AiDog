import { screen, render } from '@testing-library/react';
import { Button } from 'antd';

import {
    createWrapper,
    mockAxios,
    resetAxiosMock,
} from '@shared/mock/axios';
import {
    mockI18Next,
    restoreI18NextMock,
} from '@shared/mock/i18n';

import { CreateReportModal } from './CreateReportModal';

describe('features/record/CreateReportModal', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<CreateReportModal recordId={''} triggerComponent={open => null} />, { wrapper });

        const component = await screen.findByTestId('CreateReportModal');
        expect(component).toBeInTheDocument();
    });
});
