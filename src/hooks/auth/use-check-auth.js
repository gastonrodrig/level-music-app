import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../../modules/auth/firebase/config";
import { login, logout, checkingCredentials, showSnackbar } from "../../store";
import { useUsersStore } from "../user";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const { findUserByEmail } = useUsersStore();
  const dispatch = useDispatch();

  const openSnackbar = (message) => dispatch(showSnackbar({ message }));

  useEffect(() => {
    dispatch(checkingCredentials());
    const unsubscribe = onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { data } = await findUserByEmail(user.email);

      if (data?.status === "Inactivo") {
        openSnackbar("Usuario inactivo. Contacta al administrador.");
        dispatch(logout());
        return;
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

      dispatch(
        login({
          _id: data._id,
          uid: data.auth_id,
          email: data.email,
          firstName: data.first_name || null,
          lastName: data.last_name || null,
          phone: data.phone || null,
          documentType: data.document_type || null,
          documentNumber: data.document_number || null,
          role: data.role,
          needsPasswordChange: data.needs_password_change || null,
          userStatus: data.status, // Activo, Inactivo
          photoURL: data.profile_picture || null,
          token: user.accessToken,
          updatedAt: data.updated_at,
          createdAt: data.created_at,
          workerTypeName: data.worker_type_name,
          isExtraDataCompleted: data.is_extra_data_completed,
        })
      );
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { status };
};
