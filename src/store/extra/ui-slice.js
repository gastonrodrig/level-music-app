import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackbar: {
    open: false,
    message: '',
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.snackbar = {
        open:    true,
        message: action.payload.message,
      };
    },
    closeSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const { showSnackbar, closeSnackbar } = uiSlice.actions;