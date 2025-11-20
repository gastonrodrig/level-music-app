import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { config } from './store';
import { AppTheme } from './theme/app-theme';
import { AppRoutes } from './routes/app-routes';
import { useCheckAuth } from './hooks/auth';

function AppContent() {
  useCheckAuth();
  return <AppRoutes />;
}

export default function App() {
  return (
    <StrictMode>
      <Provider store={config}>
        <AppTheme>
          <AppContent />
        </AppTheme>
      </Provider>
    </StrictMode>
  );
};