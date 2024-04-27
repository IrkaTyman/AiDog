/**
 * Убирает мок с i18next для jest тестов
 */
export function restoreI18NextMock() {
    jest.unmock('react-i18next');
}
