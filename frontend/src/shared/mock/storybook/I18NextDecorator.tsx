import { type Decorator } from '@storybook/react';
import React from 'react';

import { I18NextWrapper } from '../axios/I18NextWrapper';

export const I18NextDecorator: Decorator = Story => {
    return I18NextWrapper(<Story/>)
};
