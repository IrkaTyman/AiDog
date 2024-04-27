import './styles/index.css';

import { AuthContextProvider } from '@app/providers/AuthProvider/AuthProvider';

import { AppRouter } from './providers/router/AppRouter';

const App = () => {
    return (
        <div>
            <AuthContextProvider>
                <AppRouter />
            </AuthContextProvider>
        </div>
    );
};

export default App;
