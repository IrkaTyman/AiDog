import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type QueryParamState = [
    string | null,
    (value: string | null) => void
];

export function useQueryParamState(name: string): QueryParamState {
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState<string | null>(null);
    const updateValue = useCallback((value: string | null) => {
        setValue(value);
        if (!value) {
            searchParams.delete(name);
        } else {
            searchParams.set(name, value);
        }
    }, [searchParams, name]);

    useEffect(() => {
        const param = searchParams.get(name);
        if (value !== param) {
            setValue(param ?? null);
        }
    }, [searchParams]);

    return [value, updateValue];
}
