import { useSelector } from "react-redux";
import { userApi } from "../../api";

export const useUsersStore = () => {
  const { 
    uid,
    email,
    firstName,
    lastName,
    phone,
    documentType,
    documentNumber,
    photoURL,
    updatedAt,
    createdAt,
    workerTypeName
  } = useSelector((state) => state.auth);

  const findUserByEmail = async (email) => {
    try {
      const { data } = await userApi.get(`find/${email}`);
      console.log('Respuesta completa de la API:', data);
      console.log('Rol desde API:', data?.role);
      if (!data) {
        return { ok: false, data: null };
      }
      return { ok: true, data };
    } catch (error) {
      return false;
    }
  }

  return {
    // state
    uid,
    email,
    firstName,
    lastName,
    phone,
    documentType,
    documentNumber,
    photoURL,
    updatedAt,
    createdAt,
    workerTypeName,

    // actions
    findUserByEmail
  };
};