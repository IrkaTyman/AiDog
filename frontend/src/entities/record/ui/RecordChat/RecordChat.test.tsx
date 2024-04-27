import { screen, render } from '@testing-library/react';

import {
    createWrapper,
} from '@shared/mock/axios';
import {
    mockI18Next,
    restoreI18NextMock,
} from '@shared/mock/i18n';

import { RecordChat } from './RecordChat';

describe('entities/record/RecordChat', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<RecordChat comments={[]} />, { wrapper });

        const component = await screen.findByTestId('RecordChat');
        expect(component).toBeInTheDocument();
    });
});
