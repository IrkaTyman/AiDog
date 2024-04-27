import { screen, render } from '@testing-library/react';

import {
    createWrapper,
} from '@shared/mock/axios';
import {
    mockI18Next,
    restoreI18NextMock,
} from '@shared/mock/i18n';

import { RecordTriggersCounts } from './RecordTriggersCounts';

describe('entities/record/RecordTriggersCounts', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<RecordTriggersCounts />, { wrapper });

        const component = await screen.findByTestId('RecordTriggersCounts');
        expect(component).toBeInTheDocument();
    });
});
