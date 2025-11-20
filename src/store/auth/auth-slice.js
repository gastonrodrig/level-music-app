import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated',  // 'authenticated' | 'not-authenticated' | 
                                  // 'checking' | 'first-login-password' | 
                                  // 'changing-password'
    _id: null, 
    uid: null, 
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
    documentType: null,
    documentNumber: null,
    role: null,
    needsPasswordChange: null, 
    userStatus: null, // Activo, Inactivo
    photoURL: null, 
    token: null,
    updatedAt: null,
    createdAt: null,
    workerTypeName: null
  },
  reducers: {
    login: (state, { payload }) => {
      if (payload.userStatus === "Inactivo") {
        state.status = "not-authenticated";
        return;
      }

      state._id = payload._id;
      state.uid = payload.uid; 
      state.email = payload.email;
      state.firstName = payload.firstName ?? null; 
      state.lastName = payload.lastName ?? null; 
      state.phone = payload.phone ?? null;
      state.documentType = payload.documentType ?? null;
      state.documentNumber = payload.documentNumber ?? null;
      state.role = payload.role;
      state.needsPasswordChange = payload.needsPasswordChange ?? null; 
      state.userStatus = payload.userStatus;
      state.photoURL = payload.photoURL; 
      state.token = payload.token;
      state.updatedAt = payload.updatedAt;
      state.createdAt = payload.createdAt;
      state.workerTypeName = payload.workerTypeName;
      state.status = payload.needsPasswordChange ? "first-login-password" : "authenticated";
    },
    logout: (state) => {
      state.status = 'not-authenticated';
      state._id = null;
      state.uid = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.phone = null;
      state.documentType = null;
      state.documentNumber = null;
      state.role = null;
      state.needsPasswordChange = null;
      state.userStatus = null;
      state.photoURL = null;
      state.token = null;
      state.updatedAt = null;
      state.createdAt = null;
      state.workerTypeName = null;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
    authenticated: (state) => {
      state.status = 'authenticated';
      state.needsPasswordChange = false;
    },
    sendingResetEmail: (state) => {
      state.status = 'sending-reset-email';
    },
    resetEmailSent: (state) => {
      state.status = 'reset-email-sent';
    },
    changingPassword: (state) => {
      state.status = 'changing-password';
    }
  }
});

export const { 
  login, 
  logout, 
  checkingCredentials, 
  authenticated,
  sendingResetEmail,
  resetEmailSent,
  changingPassword,
} = authSlice.actions;