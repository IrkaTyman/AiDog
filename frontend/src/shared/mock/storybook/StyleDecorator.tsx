import { type DecoratorFunction } from '@storybook/csf';
import { type ReactRenderer } from '@storybook/react';
import '../../styles/index.css';

export const StyleDecorator: DecoratorFunction<ReactRenderer> =
    Story => <Story />;
