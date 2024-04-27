import React from 'react';
import {type Decorator} from '@storybook/react';
import { QueryWrapper } from '../axios/QueryWrapper';

/**
 * Storybook-декоратор для работы React-Query
 * @param Story
 */
export const QueryDecorator: Decorator = Story => {
    return QueryWrapper(<Story/>)
};
