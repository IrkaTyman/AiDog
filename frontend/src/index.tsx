import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';
import './shared/config/i18n';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

import { QueryClientProvider } from 'react-query';

import { queryClient } from './shared/config/query';

import { ConfigProvider, theme } from 'antd';

const root = createRoot(document.getElementById('root')!);
root.render(
    <ErrorBoundary>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider
                    theme={{
                        algorithm: theme.darkAlgorithm,
                    }}
                >
                    <App />
                </ConfigProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </ErrorBoundary>,
);
