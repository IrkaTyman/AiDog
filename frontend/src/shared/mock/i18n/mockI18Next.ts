const MOCKED_MODULE = 'react-i18next';

export type MockOptions = typeof import('react-i18next');

/**
 * Мокает i18next для jest тестов
 * @param options параметры мока
 */
export function mockI18Next(options: MockOptions = {
    useTranslation: jest.fn().mockReturnValue({
        t: jest.fn(),
        i18: {
            language: 'ru',
        },
    }),
    setDefaults: jest.requireActual(MOCKED_MODULE).setDefaults,
    getDefaults: jest.requireActual(MOCKED_MODULE).getDefaults,
    setI18n: jest.requireActual(MOCKED_MODULE).setI18n,
    getI18n: jest.requireActual(MOCKED_MODULE).getI18n,
    composeInitialProps: jest.requireActual(MOCKED_MODULE).composeInitialProps,
    getInitialProps: jest.requireActual(MOCKED_MODULE).getInitialProps,
    Trans: jest.requireActual(MOCKED_MODULE).Trans,
    useSSR: jest.requireActual(MOCKED_MODULE).useSSR,
    withSSR: jest.requireActual(MOCKED_MODULE).withSSR,
    withTranslation: jest.requireActual(MOCKED_MODULE).withTranslation,
    Translation: jest.requireActual(MOCKED_MODULE).Translation,
    initReactI18next: jest.requireActual(MOCKED_MODULE).initReactI18next,
    I18nextProvider: jest.requireActual(MOCKED_MODULE).I18nextProvider,
    I18nContext: jest.requireActual(MOCKED_MODULE).I18nContext,
    TransWithoutContext: jest.requireActual(MOCKED_MODULE).TransWithoutContext,
}) {
    jest.mock('react-i18next', () => ({
        useTranslation: jest.fn().mockReturnValue(options),
    }));
}
