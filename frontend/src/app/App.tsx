import './styles/index.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthContextProvider } from '@app/providers/AuthProvider/AuthProvider';

import { AppRouter } from './providers/router/AppRouter';

const queryClient = new QueryClient();

const App = () => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <AppRouter />
                </AuthContextProvider>
            </QueryClientProvider>
        </div>
    );
};

export default App;
