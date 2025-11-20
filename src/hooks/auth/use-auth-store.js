import { useDispatch, useSelector } from 'react-redux';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  updatePassword,
} from 'firebase/auth';
import { FirebaseAuth } from '../../modules/auth/firebase/config';
import { 
  checkingCredentials, 
  login, 
  logout,
  showSnackbar,
  authenticated,
} from '../../store';
import { useUsersStore } from '../user/use-users-store';
import { userApi } from '../../api';
import { getAuthConfig } from '../../shared/utils';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
googleProvider.addScope("email");

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { 
    _id,
    status, 
    uid, 
    email, 
    displayName, 
    photoURL, 
    role,
    extra_data,
    token
  } = useSelector((state) => state.auth);

  const { findUserByEmail } = useUsersStore();

  const openSnackbar = (message) => dispatch(showSnackbar({ message }));

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(checkingCredentials());
      const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password);
      const { data } = await findUserByEmail(user.email); 

      if (data.status === "Inactivo") {
        openSnackbar("Usuario inactivo. Contacta al administrador.");
        dispatch(logout());
        return false;
      }

      if (
        data.role === "Administrador" ||
        data.role === "Cliente" ||
        data.role === "Almacenero"
      ) {
        openSnackbar("Este rol no tiene permitido iniciar sesión en esta aplicación.");
        dispatch(logout());
        return false;
      }
      
      const needsPassword = !!data.needs_password_change;
      dispatch(login({
        _id: data._id,
        uid: data.auth_id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        documentType: data.document_type,
        documentNumber: data.document_number,
        role: data.role,
        needsPasswordChange: needsPassword,
        userStatus: data.status,
        photoURL: data.profile_picture,
        token: user.accessToken,
        isExtraDataCompleted: data.is_extra_data_completed
      }));
      return !needsPassword;
    } catch (error) {
      dispatch(logout());
      if (error.code === "auth/invalid-credential") {
        openSnackbar("Credenciales incorrectas.");
      } else {
        openSnackbar("Error al iniciar sesión.");
      }
      return false;
    }
  };


  const onLogout = async () => {
    await signOut(FirebaseAuth);
    dispatch(logout());
  };

  const startChangePasswordFirstLogin = async ({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
      openSnackbar("Las contraseñas no coinciden.");
      return false;
    }

    try {
      const user = FirebaseAuth.currentUser;
      await updatePassword(user, password);
      await userApi.patch(`/reset-password-flag/${uid}`, {}, getAuthConfig(token));
      dispatch(authenticated());
      openSnackbar("Contraseña actualizada exitosamente.");
      return true;
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        openSnackbar("Por seguridad, vuelve a iniciar sesión para cambiar tu contraseña.");
      } else {
        openSnackbar("Error al cambiar la contraseña.");
      }
      return false;
    }
  }


  return { 
    // state
    _id,
    status, 
    uid, 
    email, 
    displayName, 
    photoURL, 
    role,
    extra_data,
    
    // actions
    startLogin,
    onLogout,
    startChangePasswordFirstLogin
  };
};
