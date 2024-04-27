module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    plugins: [
        'jsdoc',
        '@typescript-eslint',
    ],
    extends: [
        'standard',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@conarti/feature-sliced/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: '2020',
        sourceType: 'module',
    },
    rules: {
        'import/order': [
            1,
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    [
                        'parent',
                        'sibling',
                        'index',
                        'unknown',
                    ],
                ],
                pathGroups: [
                    {
                        pattern: '@app/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: '@pages/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: '@widgets/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: '@features/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: '@entities/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: '@shared/**',
                        group: 'internal',
                        position: 'after',
                    },
                ],
                'newlines-between': 'always',
                pathGroupsExcludedImportTypes: [
                    'react',
                ],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'max-len': [
            'warn',
            120,
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'arrow-parens': [
            'error',
            'as-needed',
        ],
        'linebreak-style': [
            'error',
            'windows',
        ],
        'require-await': 'error',
        semi: [
            'error',
            'always',
        ],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            },
        ],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        '@conarti/feature-sliced/absolute-relative': 'warn',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'function',
                format: [
                    'PascalCase',
                    'camelCase',
                ],
            },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/space-before-blocks': 'error',
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/no-namespace': 'off',
        'react/function-component-definition': [
            'warn',
            {
                namedComponents: 'arrow-function',
            },
        ],
        'react/jsx-no-duplicate-props': 'error',
        'react/prefer-stateless-function': 'warn',
        'react/no-this-in-sfc': 'error',
        'react/no-multi-comp': 'error',
        'react/no-deprecated': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-array-index-key': 'warn',
        'react/jsx-wrap-multilines': 'error',
        'react/jsx-tag-spacing': [
            'error',
            {
                beforeSelfClosing: 'proportional-always',
                beforeClosing: 'proportional-always',
            },
        ],
        'react/jsx-no-useless-fragment': 'error',
        'react/jsx-no-leaked-render': 'error',
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-max-props-per-line': [
            'warn',
            {
                maximum: 3,
            },
        ],
        'react/jsx-handler-names': 'warn',
        'react/react-in-jsx-scope': 'off',
    },
    overrides: [
        {
            files: [
                '**/*.tsx',
            ],
            rules: {
                'no-restricted-syntax': [
                    'error',
                    {
                        selector: 'TSInterfaceDeclaration[id.name=/Props$/] TSPropertySignature[readonly=undefined]',
                        message: 'Missing readonly modifier.',
                    },
                    {
                        selector: 'TSInterfaceDeclaration[id.name=/Props$/] TSPropertySignature TSTypeAnnotation[typeAnnotation.type=TSArrayType]',
                        message: 'Missing readonly type modifier for array.',
                    },
                    {
                        selector: "TSTypeReference[typeName.name='FC'] > TSTypeReference[typeName.name!=/PropsWithChildren$|Props$/]",
                        message: "Prefer name with `Props` ending for the component's props interface.",
                    },
                ],
            },
        },
        {
            files: [
                '*.stories.tsx',
            ],
            rules: {
                'react-hooks/rules-of-hooks': 'off',
            },
        },
    ],
    ignorePatterns: [
        '*.d.ts',
    ],
};
