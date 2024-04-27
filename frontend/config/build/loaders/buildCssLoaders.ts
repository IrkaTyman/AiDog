import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { type RuleSetRule } from 'webpack';

export function buildCssLoader(isDev: boolean): RuleSetRule[] {
    return ([
        {
            test: /\.css$/i,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
                        },
                    },
                },
            ],
            include: /\.module\.css$/,
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            exclude: /\.module\.css$/,
        },
    ]);
};
