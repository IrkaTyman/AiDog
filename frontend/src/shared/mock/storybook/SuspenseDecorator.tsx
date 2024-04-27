import { Decorator } from '@storybook/react';
import { SuspenseWrapper } from '../axios/SuspenseWrapper';

export const SuspenseDecorator: Decorator = Story => {
    return SuspenseWrapper(<Story/>);
};
