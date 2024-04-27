/**
 * Объединяет несколько классов в одну строку
 * @param classses Список классов
 */
export function mixClasses(
    ...classses: Array<string | undefined | null>
): string {
    return classses
        .filter(cls => cls != null && cls.trim().length > 0)
        .join(' ');
}
