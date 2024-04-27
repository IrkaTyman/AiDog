import path from 'path';

import webpack from 'webpack';

import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
    return ({
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        alias: {
            '@shared': path.resolve(options.paths.src, 'shared'),
            '@entities': path.resolve(options.paths.src, 'entities'),
            '@features': path.resolve(options.paths.src, 'features'),
            '@widgets': path.resolve(options.paths.src, 'widgets'),
            '@pages': path.resolve(options.paths.src, 'pages'),
            '@app': path.resolve(options.paths.src, 'app'),
        },
        mainFiles: ['index'],
    });
}
