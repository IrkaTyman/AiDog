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

import { CreateTriggerModal } from './CreateTriggerModal';

describe('features/record/CreateTriggerModal', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<CreateTriggerModal triggerComponent={open => null} />, { wrapper });

        const component = await screen.findByTestId('CreateTriggerModal');
        expect(component).toBeInTheDocument();
    });
});
