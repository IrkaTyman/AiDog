import './styles/index.css';
import { useTranslation } from 'react-i18next';

import { AppRouter } from './providers/router/AppRouter';

const App = () => {
    const { t } = useTranslation();
    return (
        <div>
            <AppRouter />
        </div>
    );
};

export default App;
