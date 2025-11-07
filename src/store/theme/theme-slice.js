import { createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

const getSystemTheme = () => Appearance.getColorScheme() || 'light';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getSystemTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;