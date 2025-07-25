import axios from "axios";

const LOGIN_URL = "http://127.0.0.1:8000/api1/users/login";
const VERIFY_URL = "http://127.0.0.1:8000/api1/users/verify-2fa";

/* Login: devuelve el temporaryToken */
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(LOGIN_URL, { email, password });
  return res.data;
};

/* Verificación 2FA: se envía temporaryToken y código en el body (no headers) */
export const verifyCode = async (
  code: string,
  temporaryToken: string
) => {
  try {
    const res = await axios.post(VERIFY_URL, {
      code,
      temporaryToken,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Código incorrecto o expirado.",
      };
    } else if (error.request) {
      return {
        success: false,
        message: "No se pudo conectar con el servidor.",
      };
    } else {
      return {
        success: false,
        message: "Ocurrió un error inesperado.",
      };
    }
  }
};