import { Suspense } from 'react';

/**
 * Тестовая оболочка для работы Suspense
 * @param component
 */
export const SuspenseWrapper = (component: React.JSX.Element) => {
    return (
        <Suspense fallback={'Loading...'}>
            {component}
        </Suspense>
    );
};
