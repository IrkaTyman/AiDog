import { screen, render } from '@testing-library/react';
import { Button } from 'antd';

import {
    createWrapper,
} from '@shared/mock/axios';
import {
    mockI18Next,
    restoreI18NextMock,
} from '@shared/mock/i18n';

import { CreateRecordModal } from './CreateRecordModal';

describe('features/record/CreateRecordModal', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<CreateRecordModal triggerComponent={open => <Button onClick={open}>Click</Button>} />, { wrapper });

        const component = await screen.findByTestId('CreateRecordModal');
        expect(component).toBeInTheDocument();
    });
});
