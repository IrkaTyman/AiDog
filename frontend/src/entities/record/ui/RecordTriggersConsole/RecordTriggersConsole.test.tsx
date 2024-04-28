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

import { RecordTriggersConsole } from './RecordTriggersConsole';

describe('entities/record/RecordTriggersConsole', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<RecordTriggersConsole comments={[]} index={0} setIndex={() => {}}/>, { wrapper });

        const component = await screen.findByTestId('RecordTriggersConsole');
        expect(component).toBeInTheDocument();
    });
});
