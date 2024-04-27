import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({});
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
