import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../config/query';

/**
 * Тестовая оболочка для работы React Query
 * @param component
 */
export const QueryWrapper = (component: React.JSX.Element) => {
    return (
        <QueryClientProvider client={queryClient}>
            {component}
        </QueryClientProvider>
    );
};
