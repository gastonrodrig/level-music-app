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
    photoURL
  } = useSelector((state) => state.auth);

  const findUserByEmail = async (email) => {
    try {
      const { data } = await userApi.get(`find/${email}`);
      console.log(data)
      if (!data) {
        return { ok: false, data: null };
      }
      return { ok: true, data };
    } catch (error) {
      console.log(error);
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

    // actions
    findUserByEmail
  };
};