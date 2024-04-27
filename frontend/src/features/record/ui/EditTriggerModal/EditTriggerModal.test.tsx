import { screen, render } from '@testing-library/react';

import { TriggerType } from '@entities/record/model/TriggerType';

import {
    createWrapper,
    mockAxios,
    resetAxiosMock,
} from '@shared/mock/axios';
import {
    mockI18Next,
    restoreI18NextMock,
} from '@shared/mock/i18n';

import { EditTriggerModal } from './EditTriggerModal';

describe('features/record/EditTriggerModal', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<EditTriggerModal trigger={{
            id: '',
            name: '',
            description: '',
            color: '',
            type: TriggerType.Good,
        }}
        />, { wrapper });

        const component = await screen.findByTestId('EditTriggerModal');
        expect(component).toBeInTheDocument();
    });
});
