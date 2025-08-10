import axios from "axios";

const LOGIN_URL = "https://apidev.safekids.site/api1/users/login";
const VERIFY_URL = "https://apidev.safekids.site/api1/users/verify-2fa";

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

    // Si la respuesta es exitosa
    if (res.data?.success) {
      // Guardar school en localStorage
      localStorage.setItem("school", JSON.stringify(res.data.school));

      // (Opcional) también guardar token si lo necesitas
      if (res.data.token) {
        localStorage.setItem("jwt", res.data.token);
      }
    }

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


const RESEND_URL = "https://apidev.safekids.site/api1/users/resend-2fa";

export const resend2FACode = async () => {
  try {
    // Obtener email desde localStorage
    const email = localStorage.getItem("email");
    
    if (!email) {
      return {
        success: false,
        message: "No hay correo guardado en localStorage.",
      };
    }

    // Enviar el email en el body de la petición
    const res = await axios.post(RESEND_URL, { email });

    return res.data;
  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "No se pudo reenviar el código.",
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

