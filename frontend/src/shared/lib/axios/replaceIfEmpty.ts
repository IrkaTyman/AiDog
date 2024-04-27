export function replaceIfEmpty<T>(placeholder: T) {
    return function (data?: T | null) {
        if (data === '' || data == null) {
            return placeholder;
        }

        return data;
    };
}
