import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { themeSlice } from './theme';
import { uiSlice } from './extra';
import { quotationSlice } from './quotation';
import { workersSlice } from './worker';

export const config = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    ui: uiSlice.reducer,
    quotation: quotationSlice.reducer,
    workers: workersSlice.reducer,
  },
});
