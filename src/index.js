import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { config } from './store';
import { AppTheme } from './theme/app-theme';
import { AppRoutes } from './routes/app-routes';
import { GlobalSnackbar } from './shared/ui';

export default function App() {
  return (
      <Provider store={config}>
        <AppTheme>
          <AppRoutes />
          <GlobalSnackbar /> 
        </AppTheme>
      </Provider>
  );
};