import path from 'path';

import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {
            builder: {
                useSWC: true,
            },
        },
    },
    swc: () => ({
        jsc: {
            transform: {
                react: {
                    runtime: 'automatic',
                },
            },
        },
    }),
    docs: {
        autodocs: 'tag',
    },
    previewHead: head => `
        ${head}
        <style>
            #storybook-root {
                margin: 0;
                width: 100%;
            }
        </style>
    `,
    webpackFinal: async config => {
        config.resolve!.alias = {
            ...config.resolve!.alias,
            '@shared': path.resolve(__dirname, '../../src/shared'),
            '@entities': path.resolve(__dirname, '../../src/entities'),
            '@features': path.resolve(__dirname, '../../src/features'),
            '@widgets': path.resolve(__dirname, '../../src/widgets'),
            '@pages': path.resolve(__dirname, '../../src/pages'),
            '@app': path.resolve(__dirname, '../../src/app'),
        };

        return config;
    },
};
export default config;
