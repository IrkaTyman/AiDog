import { useEffect, useState } from 'react';

/**
 * Хук, позволяющий реализовать стейт с задержкой при изменении
 * @param value Значение стейта
 * @param delay Задержка при изменении
 */
export function useDebounceState<TValue>(value: TValue, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay],
    );

    return debouncedValue;
}
