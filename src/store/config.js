import { configureStore } from '@reduxjs/toolkit';
import { 
  authSlice,
  themeSlice
} from '.';

export const config = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
  },
});
